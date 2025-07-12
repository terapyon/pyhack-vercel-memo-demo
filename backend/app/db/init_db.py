"""
データベース初期化スクリプト
Vercel Postgres用のテーブル作成
"""
from sqlalchemy import create_engine
from app.core.config import settings
from app.models import Base
from app.models.user import User
from app.models.memo_folder import MemoFolder
from app.models.memo import Memo

def create_tables():
    """テーブルを作成する"""
    try:
        engine = create_engine(settings.database_url)
        Base.metadata.create_all(bind=engine)
        print("✅ テーブルが正常に作成されました")
        return True
    except Exception as e:
        print(f"❌ テーブル作成エラー: {e}")
        return False

if __name__ == "__main__":
    create_tables()