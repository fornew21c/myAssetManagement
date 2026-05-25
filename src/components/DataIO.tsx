import { ChangeEvent, useRef } from 'react';
import { Asset } from '../types';

interface Props {
  assets: Asset[];
  onImport: (assets: Asset[]) => void;
}

export function DataIO({ assets, onImport }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(assets, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const date = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `my-assets-${date}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!Array.isArray(parsed)) {
        alert('잘못된 파일 형식입니다. 자산 배열이 아닙니다.');
        return;
      }
      if (
        !confirm(
          `${parsed.length}건의 자산을 가져옵니다. 기존 데이터는 덮어써집니다. 계속할까요?`
        )
      ) {
        return;
      }
      onImport(parsed as Asset[]);
    } catch {
      alert('파일을 읽는 중 오류가 발생했습니다.');
    } finally {
      e.target.value = '';
    }
  };

  return (
    <div className="header-actions">
      <button className="btn btn-secondary" onClick={handleExport}>
        내보내기
      </button>
      <button className="btn btn-secondary" onClick={handleImportClick}>
        가져오기
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
}
