from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# データベースエンジンの作成
engine = create_engine(
    settings.database_url,
    # PostgreSQL用の設定
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True,
    echo=True  # 開発時はSQLログを出力
)

# セッションファクトリーの作成
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ベースクラスの作成
Base = declarative_base()

# データベースセッションの依存性注入用
def get_db():
    """データベースセッションを取得"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# データベース接続テスト用関数
def test_database_connection():
    """データベース接続をテスト"""
    try:
        with engine.connect() as connection:
            result = connection.execute("SELECT 1")
            return {"status": "success", "message": "Database connection successful"}
    except Exception as e:
        return {"status": "error", "message": f"Database connection failed: {str(e)}"}