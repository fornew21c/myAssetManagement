import { useEffect, useState } from 'react';
import { Asset, AssetCategory } from './types';
import { generateId, loadAssets, saveAssets } from './storage';
import { Summary } from './components/Summary';
import { AssetChart } from './components/AssetChart';
import { AssetForm } from './components/AssetForm';
import { AssetList } from './components/AssetList';
import { DataIO } from './components/DataIO';

export default function App() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [editing, setEditing] = useState<Asset | null>(null);

  useEffect(() => {
    setAssets(loadAssets());
  }, []);

  useEffect(() => {
    saveAssets(assets);
  }, [assets]);

  const handleSubmit = (data: {
    name: string;
    category: AssetCategory;
    amount: number;
    note: string;
  }) => {
    const now = new Date().toISOString();
    if (editing) {
      setAssets((prev) =>
        prev.map((a) =>
          a.id === editing.id
            ? { ...a, ...data, updatedAt: now }
            : a
        )
      );
      setEditing(null);
    } else {
      const newAsset: Asset = {
        id: generateId(),
        ...data,
        createdAt: now,
        updatedAt: now,
      };
      setAssets((prev) => [newAsset, ...prev]);
    }
  };

  const handleDelete = (id: string) => {
    setAssets((prev) => prev.filter((a) => a.id !== id));
    if (editing?.id === id) setEditing(null);
  };

  const handleImport = (imported: Asset[]) => {
    setAssets(imported);
    setEditing(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>나의 자산 관리</h1>
          <div className="subtitle">
            현금 · 주식 · 부동산을 한눈에 관리하세요
          </div>
        </div>
        <DataIO assets={assets} onImport={handleImport} />
      </header>

      <div className="grid grid-2" style={{ marginBottom: 16 }}>
        <Summary assets={assets} />
        <AssetChart assets={assets} />
      </div>

      <div className="grid grid-2" style={{ marginBottom: 16 }}>
        <AssetList
          assets={assets}
          onEdit={setEditing}
          onDelete={handleDelete}
        />
        <AssetForm
          editing={editing}
          onSubmit={handleSubmit}
          onCancel={() => setEditing(null)}
        />
      </div>
    </div>
  );
}
