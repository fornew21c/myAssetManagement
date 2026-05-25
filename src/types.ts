export type AssetCategory = 'cash' | 'stock' | 'real_estate' | 'other';

export interface Asset {
  id: string;
  name: string;
  category: AssetCategory;
  amount: number;
  note: string;
  createdAt: string;
  updatedAt: string;
}

export const CATEGORY_LABELS: Record<AssetCategory, string> = {
  cash: '현금',
  stock: '주식',
  real_estate: '부동산',
  other: '기타',
};

export const CATEGORY_COLORS: Record<AssetCategory, string> = {
  cash: '#10b981',
  stock: '#3b82f6',
  real_estate: '#f59e0b',
  other: '#9ca3af',
};

export const CATEGORIES: AssetCategory[] = ['cash', 'stock', 'real_estate', 'other'];
