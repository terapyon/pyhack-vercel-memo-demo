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

- **バックエンド**: FastAPI + Python
- **データベース**: PostgreSQL
- **コンテナ**: Docker + Docker Compose