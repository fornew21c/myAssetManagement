import { Router, Request, Response } from 'express';
import { db, Asset, AssetCategory } from '../db';

const router = Router();

const VALID_CATEGORIES: AssetCategory[] = ['cash', 'stock', 'real_estate', 'other'];

function validateAssetInput(body: any): { ok: true; data: Omit<Asset, 'id' | 'created_at' | 'updated_at'> } | { ok: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Invalid request body' };
  }
  const { name, category, amount, currency, note } = body;
  if (typeof name !== 'string' || name.trim().length === 0) {
    return { ok: false, error: 'name is required' };
  }
  if (!VALID_CATEGORIES.includes(category)) {
    return { ok: false, error: `category must be one of ${VALID_CATEGORIES.join(', ')}` };
  }
  const amountNum = Number(amount);
  if (!Number.isFinite(amountNum)) {
    return { ok: false, error: 'amount must be a number' };
  }
  return {
    ok: true,
    data: {
      name: name.trim(),
      category,
      amount: amountNum,
      currency: typeof currency === 'string' && currency.trim() ? currency.trim() : 'KRW',
      note: typeof note === 'string' ? note : null,
    },
  };
}

router.get('/summary', (_req: Request, res: Response) => {
  const rows = db
    .prepare(
      `SELECT category, SUM(amount) AS total, COUNT(*) AS count
       FROM assets
       GROUP BY category`
    )
    .all() as { category: AssetCategory; total: number; count: number }[];

  const totalAmount = rows.reduce((sum, row) => sum + (row.total ?? 0), 0);
  const byCategory: Record<string, { total: number; count: number; ratio: number }> = {};
  for (const cat of VALID_CATEGORIES) {
    byCategory[cat] = { total: 0, count: 0, ratio: 0 };
  }
  for (const row of rows) {
    byCategory[row.category] = {
      total: row.total ?? 0,
      count: row.count ?? 0,
      ratio: totalAmount > 0 ? (row.total ?? 0) / totalAmount : 0,
    };
  }
  res.json({ totalAmount, byCategory });
});

router.get('/', (_req: Request, res: Response) => {
  const rows = db
    .prepare(`SELECT * FROM assets ORDER BY created_at DESC`)
    .all() as Asset[];
  res.json(rows);
});

router.get('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'invalid id' });
  const row = db.prepare(`SELECT * FROM assets WHERE id = ?`).get(id) as Asset | undefined;
  if (!row) return res.status(404).json({ error: 'not found' });
  res.json(row);
});

router.post('/', (req: Request, res: Response) => {
  const result = validateAssetInput(req.body);
  if (!result.ok) return res.status(400).json({ error: result.error });
  const { name, category, amount, currency, note } = result.data;
  const info = db
    .prepare(
      `INSERT INTO assets (name, category, amount, currency, note)
       VALUES (?, ?, ?, ?, ?)`
    )
    .run(name, category, amount, currency, note);
  const created = db
    .prepare(`SELECT * FROM assets WHERE id = ?`)
    .get(info.lastInsertRowid) as Asset;
  res.status(201).json(created);
});

router.put('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'invalid id' });
  const existing = db.prepare(`SELECT * FROM assets WHERE id = ?`).get(id) as Asset | undefined;
  if (!existing) return res.status(404).json({ error: 'not found' });

  const result = validateAssetInput(req.body);
  if (!result.ok) return res.status(400).json({ error: result.error });
  const { name, category, amount, currency, note } = result.data;

  db.prepare(
    `UPDATE assets
     SET name = ?, category = ?, amount = ?, currency = ?, note = ?, updated_at = datetime('now')
     WHERE id = ?`
  ).run(name, category, amount, currency, note, id);

  const updated = db.prepare(`SELECT * FROM assets WHERE id = ?`).get(id) as Asset;
  res.json(updated);
});

router.delete('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'invalid id' });
  const info = db.prepare(`DELETE FROM assets WHERE id = ?`).run(id);
  if (info.changes === 0) return res.status(404).json({ error: 'not found' });
  res.status(204).send();
});

export default router;
