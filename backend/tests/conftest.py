import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.db.database import get_db, Base
import os

# テスト用データベースURL
SQLALCHEMY_DATABASE_URL = os.getenv(
    "TEST_DATABASE_URL", 
    "sqlite:///./test.db"
)

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in SQLALCHEMY_DATABASE_URL else {}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    """テスト用データベースセッション"""
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

@pytest.fixture
def client():
    """FastAPIテストクライアント"""
    # テスト用データベースを使用
    app.dependency_overrides[get_db] = override_get_db
    
    # テーブル作成
    Base.metadata.create_all(bind=engine)
    
    with TestClient(app) as c:
        yield c
    
    # テーブル削除
    Base.metadata.drop_all(bind=engine)
    
    # 依存性のオーバーライドをクリア
    app.dependency_overrides.clear()

@pytest.fixture
def db_session():
    """テスト用データベースセッション"""
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)