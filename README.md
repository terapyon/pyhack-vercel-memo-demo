# pyhack-vercel-memo-demo
デモ用のメモアプリ

## 開発環境の起動

### 必要なツール
- Docker
- Docker Compose

### 起動手順

1. リポジトリをクローン
```bash
git clone <repository-url>
cd pyhack-vercel-memo-demo
```

2. Docker Composeでサービスを起動
```bash
docker-compose up -d
```

3. サービスの確認
- フロントエンド: http://localhost:3000
- バックエンドAPI: http://localhost:8000
- PostgreSQL: localhost:5432

### APIエンドポイント

- `GET /` - API動作確認
- `GET /health` - ヘルスチェック
- `GET /api/test` - 設定確認
- `GET /api/db/test` - DB接続テスト
- `GET /api/db/check` - DBセッション確認

### ログの確認

```bash
# 全サービスのログ
docker-compose logs -f

# バックエンドのみ
docker-compose logs -f backend

# PostgreSQLのみ
docker-compose logs -f postgres
```

### 開発時の操作

```bash
# サービス停止
docker-compose down

# サービス再起動
docker-compose restart backend

# データベースのリセット（ボリューム削除）
docker-compose down -v
```

## 技術スタック

- **フロントエンド**: Next.js + TypeScript + MUI + Recoil
- **バックエンド**: FastAPI + Python
- **データベース**: PostgreSQL
- **コンテナ**: Docker + Docker Compose
- **テスト**: Jest (Frontend) + pytest (Backend)
- **CI/CD**: GitHub Actions

## テスト

### フロントエンドテスト

```bash
# frontendディレクトリに移動
cd frontend

# 依存関係をインストール
npm ci

# 全テストを実行
npm test

# カバレッジ付きでテスト実行
npm run test:coverage

# リンターを実行
npm run lint
```

### バックエンドテスト

```bash
# backendディレクトリに移動
cd backend

# 依存関係をインストール
pip install -r requirements.txt

# 全テストを実行
pytest

# マーカー別にテスト実行
pytest -m unit       # ユニットテスト
pytest -m api        # APIテスト
pytest -m integration # インテグレーションテスト

# カバレッジ付きでテスト実行
pytest --cov=app --cov-report=html
```

### Dockerでのテスト実行

```bash
# フロントエンドテスト
docker-compose exec frontend npm test

# バックエンドテスト
docker-compose exec backend pytest

# API動作確認
docker-compose exec backend python test_api.py
```

### GitHub Actions

- **Frontend Tests**: フロントエンドのユニットテスト・ビルド確認
- **Backend Tests**: バックエンドの単体・統合テスト
- **Docker Build**: Docker環境でのビルドとテスト

プッシュやプルリクエスト時に自動実行されます。