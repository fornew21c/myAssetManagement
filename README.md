# 나의 자산 관리 (My Asset Management)

현금, 주식, 부동산 등 보유 자산을 등록하고 자산 현황을 차트로 시각화하는 웹 애플리케이션입니다.

## 기술 스택

- **Frontend**: React 18 + TypeScript + Vite + Recharts
- **Backend**: Node.js + Express + TypeScript
- **Database**: SQLite (better-sqlite3)

## 디렉토리 구조

```
myAssetManagement/
├── backend/        # Express + SQLite API 서버
└── frontend/       # React + Vite 클라이언트
```

## 실행 방법

### 1) 백엔드 실행

```bash
cd backend
npm install
npm run dev
```

기본 포트: `http://localhost:4000`

### 2) 프론트엔드 실행

```bash
cd frontend
npm install
npm run dev
```

기본 포트: `http://localhost:5173`

프론트엔드는 Vite 프록시를 통해 `/api` 요청을 백엔드(`localhost:4000`)로 전달합니다.

## 주요 기능

- 자산 등록 / 수정 / 삭제
- 자산 카테고리: 현금, 주식, 부동산, 기타
- 카테고리별 자산 비중 파이 차트
- 자산 총액 및 카테고리별 합계 통계
- 자산 목록 테이블 (정렬/필터)

## API 엔드포인트

| Method | Path                  | 설명                  |
|--------|-----------------------|----------------------|
| GET    | `/api/assets`         | 모든 자산 조회         |
| POST   | `/api/assets`         | 자산 생성             |
| PUT    | `/api/assets/:id`     | 자산 수정             |
| DELETE | `/api/assets/:id`     | 자산 삭제             |
| GET    | `/api/assets/summary` | 카테고리별 합계 요약    |
