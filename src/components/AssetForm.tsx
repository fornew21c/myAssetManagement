import { FormEvent, useEffect, useState } from 'react';
import { Asset, AssetCategory, CATEGORIES, CATEGORY_LABELS } from '../types';

interface Props {
  editing: Asset | null;
  onSubmit: (data: {
    name: string;
    category: AssetCategory;
    amount: number;
    note: string;
  }) => void;
  onCancel: () => void;
}

export function AssetForm({ editing, onSubmit, onCancel }: Props) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<AssetCategory>('cash');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setCategory(editing.category);
      setAmount(String(editing.amount));
      setNote(editing.note);
    } else {
      setName('');
      setCategory('cash');
      setAmount('');
      setNote('');
    }
    setError('');
  }, [editing]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('자산 이름을 입력해주세요.');
      return;
    }
    const amountNum = Number(amount);
    if (!Number.isFinite(amountNum)) {
      setError('금액은 숫자여야 합니다.');
      return;
    }
    onSubmit({
      name: name.trim(),
      category,
      amount: amountNum,
      note: note.trim(),
    });
  };

  return (
    <div className="card">
      <h2>{editing ? '자산 수정' : '자산 등록'}</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">자산 이름</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예: 국민은행 입출금, 삼성전자, 아파트"
          />
        </div>
        <div className="form-row">
          <div>
            <label htmlFor="category">카테고리</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as AssetCategory)}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {CATEGORY_LABELS[cat]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="amount">금액 (원)</label>
            <input
              id="amount"
              type="number"
              inputMode="numeric"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              step="1"
            />
          </div>
        </div>
        <div>
          <label htmlFor="note">메모 (선택)</label>
          <input
            id="note"
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="예: 비상금, 장기 보유 종목"
          />
        </div>
        {error && (
          <div style={{ color: '#ef4444', fontSize: 13 }}>{error}</div>
        )}
        <div className="form-actions">
          {editing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              취소
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            {editing ? '수정' : '등록'}
          </button>
        </div>
      </form>
    </div>
  );
}
