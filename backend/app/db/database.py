from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# データベースエンジンの作成
if "sqlite" in settings.database_url:
    # SQLite用の設定
    engine = create_engine(
        settings.database_url,
        connect_args={"check_same_thread": False},
        echo=False  # SQLiteではログを抑制
    )
else:
    # PostgreSQL用の設定
    engine = create_engine(
        settings.database_url,
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
            result = connection.execute(text("SELECT 1"))
            return {"status": "success", "message": "Database connection successful"}
    except Exception as e:
        return {"status": "error", "message": f"Database connection failed: {str(e)}"}