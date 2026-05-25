import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DATA_DIR = path.resolve(__dirname, '../data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const dbPath = path.join(DATA_DIR, 'assets.db');
export const db = new Database(dbPath);

db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS assets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('cash', 'stock', 'real_estate', 'other')),
    amount REAL NOT NULL,
    currency TEXT NOT NULL DEFAULT 'KRW',
    note TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

export type AssetCategory = 'cash' | 'stock' | 'real_estate' | 'other';

export interface Asset {
  id: number;
  name: string;
  category: AssetCategory;
  amount: number;
  currency: string;
  note: string | null;
  created_at: string;
  updated_at: string;
}
