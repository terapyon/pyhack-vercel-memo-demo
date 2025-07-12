import pytest
from sqlalchemy.orm import Session
from app.models.user import User
from app.models.memo_folder import MemoFolder
from app.models.memo import Memo

@pytest.mark.unit
def test_user_model(db_session: Session):
    """ユーザモデルのテスト"""
    user = User(
        username="testuser",
        email="test@example.com",
        hashed_password="hashedpassword123"
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    
    assert user.id is not None
    assert user.username == "testuser"
    assert user.email == "test@example.com"
    assert user.created_at is not None
    assert user.updated_at is not None

@pytest.mark.unit
def test_memo_folder_model(db_session: Session):
    """メモフォルダモデルのテスト"""
    # テスト用ユーザを作成
    user = User(
        username="testuser",
        email="test@example.com",
        hashed_password="hashedpassword123"
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    
    # メモフォルダを作成
    folder = MemoFolder(
        name="テストフォルダ",
        user_id=user.id
    )
    db_session.add(folder)
    db_session.commit()
    db_session.refresh(folder)
    
    assert folder.id is not None
    assert folder.name == "テストフォルダ"
    assert folder.user_id == user.id
    assert folder.created_at is not None
    assert folder.updated_at is not None

@pytest.mark.unit
def test_memo_model(db_session: Session):
    """メモモデルのテスト"""
    # テスト用ユーザを作成
    user = User(
        username="testuser",
        email="test@example.com",
        hashed_password="hashedpassword123"
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    
    # メモフォルダを作成
    folder = MemoFolder(
        name="テストフォルダ",
        user_id=user.id
    )
    db_session.add(folder)
    db_session.commit()
    db_session.refresh(folder)
    
    # メモを作成
    memo = Memo(
        title="テストメモ",
        content="これはテスト用のメモです。",
        memo_folder_id=folder.id
    )
    db_session.add(memo)
    db_session.commit()
    db_session.refresh(memo)
    
    assert memo.id is not None
    assert memo.title == "テストメモ"
    assert memo.content == "これはテスト用のメモです。"
    assert memo.memo_folder_id == folder.id
    assert memo.created_at is not None
    assert memo.updated_at is not None

@pytest.mark.integration
def test_user_folder_relationship(db_session: Session):
    """ユーザとフォルダのリレーションシップテスト"""
    # ユーザを作成
    user = User(
        username="testuser",
        email="test@example.com",
        hashed_password="hashedpassword123"
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    
    # 複数のフォルダを作成
    folder1 = MemoFolder(name="フォルダ1", user_id=user.id)
    folder2 = MemoFolder(name="フォルダ2", user_id=user.id)
    
    db_session.add_all([folder1, folder2])
    db_session.commit()
    
    # リレーションシップの確認
    assert len(user.memo_folders) == 2
    assert folder1.user.username == "testuser"
    assert folder2.user.username == "testuser"

@pytest.mark.integration
def test_folder_memo_relationship(db_session: Session):
    """フォルダとメモのリレーションシップテスト"""
    # ユーザとフォルダを作成
    user = User(
        username="testuser",
        email="test@example.com",
        hashed_password="hashedpassword123"
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    
    folder = MemoFolder(name="テストフォルダ", user_id=user.id)
    db_session.add(folder)
    db_session.commit()
    db_session.refresh(folder)
    
    # 複数のメモを作成
    memo1 = Memo(title="メモ1", content="内容1", memo_folder_id=folder.id)
    memo2 = Memo(title="メモ2", content="内容2", memo_folder_id=folder.id)
    
    db_session.add_all([memo1, memo2])
    db_session.commit()
    
    # リレーションシップの確認
    assert len(folder.memos) == 2
    assert memo1.memo_folder.name == "テストフォルダ"
    assert memo2.memo_folder.name == "テストフォルダ"