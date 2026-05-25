# 나의 자산 관리 (My Asset Management)

현금, 주식, 부동산 등 보유 자산을 등록하고 자산 현황을 차트로 시각화하는 웹 애플리케이션입니다.
**브라우저 LocalStorage에 데이터를 저장**하므로 별도 서버 없이 동작합니다.

## 기술 스택

- **React 18** + **TypeScript** + **Vite**
- **Recharts** (자산 비중 차트)
- **LocalStorage** (데이터 저장)

## 실행 방법

```bash
npm install
npm run dev
```

기본 포트: `http://localhost:5173`

## 빌드

```bash
npm run build
npm run preview
```

## 주요 기능

- 자산 등록 / 수정 / 삭제
- 카테고리: 현금, 주식, 부동산, 기타
- 총 자산 및 카테고리별 합계·비율 표시
- 자산 비중 도넛 차트 (Recharts)
- JSON 내보내기 / 가져오기 (백업·복원)
- 자동 저장 (LocalStorage)

## 데이터 저장 위치

브라우저의 LocalStorage 키 `myAssetManagement.assets.v1`에 저장됩니다.
다른 브라우저/기기에서 사용하려면 **내보내기** 버튼으로 JSON을 백업한 뒤,
다른 환경에서 **가져오기**로 복원하세요.

## GitHub Pages 배포

이 저장소는 `main` (또는 `master`) 브랜치에 push 되면 GitHub Actions로 자동
빌드 후 GitHub Pages에 배포됩니다 (`.github/workflows/deploy.yml`).

### 최초 1회 설정 (저장소 Settings에서 직접)

1. GitHub 저장소 → **Settings** → **Pages**
2. **Source**: `GitHub Actions` 선택
3. 현재 작업 브랜치(`claude/asset-management-program-hxPwv`)를 `main`으로 머지
   하거나, 워크플로우의 `branches` 항목에 현재 브랜치를 추가
4. Actions 탭에서 워크플로우 실행 확인
5. 배포 완료 후 주소: `https://<username>.github.io/myAssetManagement/`

> ℹ️ public 저장소만 무료. private 저장소는 GitHub Pro 이상 필요.

> ⚠️ `vite.config.ts`의 `base: '/myAssetManagement/'`는 저장소 이름과 일치해야
> 합니다. 저장소 이름을 바꾸면 이 값도 함께 수정하세요.

## 디렉토리 구조

```
src/
├── App.tsx              # 루트 컴포넌트
├── App.css              # 전역 스타일
├── main.tsx             # 엔트리
├── types.ts             # 자산 타입 / 카테고리 메타
├── storage.ts           # LocalStorage 입출력
├── utils.ts             # 포맷터 (KRW, 날짜)
└── components/
    ├── Summary.tsx      # 총 자산 / 카테고리 합계
    ├── AssetChart.tsx   # 도넛 차트
    ├── AssetForm.tsx    # 등록 / 수정 폼
    ├── AssetList.tsx    # 자산 목록 테이블
    └── DataIO.tsx       # JSON 내보내기 / 가져오기
```
