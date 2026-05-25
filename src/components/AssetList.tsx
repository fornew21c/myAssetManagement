import { Asset, CATEGORY_COLORS, CATEGORY_LABELS } from '../types';
import { formatDate, formatKRW } from '../utils';

interface Props {
  assets: Asset[];
  onEdit: (asset: Asset) => void;
  onDelete: (id: string) => void;
}

export function AssetList({ assets, onEdit, onDelete }: Props) {
  return (
    <div className="card">
      <div className="section-title">
        <h2>자산 목록 ({assets.length})</h2>
      </div>
      {assets.length === 0 ? (
        <div className="empty-state">
          아직 등록된 자산이 없습니다. 오른쪽 폼에서 자산을 추가해보세요.
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="asset-table">
            <thead>
              <tr>
                <th>이름</th>
                <th>카테고리</th>
                <th className="amount">금액</th>
                <th>메모</th>
                <th>등록일</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset.id}>
                  <td>{asset.name}</td>
                  <td>
                    <span className="category-chip">
                      <span
                        className="dot"
                        style={{
                          background: CATEGORY_COLORS[asset.category],
                        }}
                      />
                      {CATEGORY_LABELS[asset.category]}
                    </span>
                  </td>
                  <td className="amount">{formatKRW(asset.amount)}</td>
                  <td style={{ color: '#6b7280' }}>{asset.note || '-'}</td>
                  <td style={{ color: '#6b7280' }}>
                    {formatDate(asset.createdAt)}
                  </td>
                  <td className="actions">
                    <button
                      className="btn btn-secondary btn-icon"
                      onClick={() => onEdit(asset)}
                    >
                      수정
                    </button>
                    <button
                      className="btn btn-danger btn-icon"
                      style={{ marginLeft: 4 }}
                      onClick={() => {
                        if (confirm(`'${asset.name}' 자산을 삭제할까요?`)) {
                          onDelete(asset.id);
                        }
                      }}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
