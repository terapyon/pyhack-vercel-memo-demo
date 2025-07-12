from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.database import Base

class MemoFolder(Base):
    """メモフォルダモデル"""
    __tablename__ = "memo_folders"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # リレーション
    user = relationship("User", back_populates="memo_folders")
    memos = relationship("Memo", back_populates="memo_folder", cascade="all, delete-orphan")