import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Asset, CATEGORIES, CATEGORY_COLORS, CATEGORY_LABELS } from '../types';
import { formatKRW } from '../utils';

interface Props {
  assets: Asset[];
}

export function AssetChart({ assets }: Props) {
  const data = CATEGORIES.map((cat) => {
    const sum = assets
      .filter((a) => a.category === cat)
      .reduce((acc, a) => acc + a.amount, 0);
    return {
      name: CATEGORY_LABELS[cat],
      value: sum,
      color: CATEGORY_COLORS[cat],
    };
  }).filter((d) => d.value > 0);

  return (
    <div className="card">
      <h2>자산 비중</h2>
      {data.length === 0 ? (
        <div className="empty-state">등록된 자산이 없습니다.</div>
      ) : (
        <div style={{ width: '100%', height: 280 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={55}
                paddingAngle={2}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => formatKRW(value)}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
