import { Asset, CATEGORIES, CATEGORY_COLORS, CATEGORY_LABELS } from '../types';
import { formatKRW } from '../utils';

interface Props {
  assets: Asset[];
}

export function Summary({ assets }: Props) {
  const total = assets.reduce((sum, a) => sum + a.amount, 0);
  const byCategory = CATEGORIES.map((cat) => {
    const items = assets.filter((a) => a.category === cat);
    const sum = items.reduce((acc, a) => acc + a.amount, 0);
    const ratio = total > 0 ? (sum / total) * 100 : 0;
    return { category: cat, sum, ratio, count: items.length };
  });

  return (
    <div className="card">
      <h2>총 자산</h2>
      <div className="summary-total">{formatKRW(total)}</div>
      <div className="summary-categories">
        {byCategory.map(({ category, sum, ratio }) => (
          <div key={category} className="summary-category">
            <div className="label">
              <span
                className="dot"
                style={{ background: CATEGORY_COLORS[category] }}
              />
              {CATEGORY_LABELS[category]}
            </div>
            <div className="amount">{formatKRW(sum)}</div>
            <div className="ratio">{ratio.toFixed(1)}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
