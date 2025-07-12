import os
from typing import Optional
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """アプリケーション設定"""
    
    # データベース設定 - Vercel Postgres対応
    database_url: str = os.getenv("POSTGRES_URL", 
                                  os.getenv("DATABASE_URL", 
                                           "postgresql://memo_user:memo_password@localhost:5432/memo_app"))
    
    # API設定
    api_host: str = os.getenv("API_HOST", "0.0.0.0")
    api_port: int = int(os.getenv("API_PORT", "8000"))
    api_reload: bool = os.getenv("API_RELOAD", "True").lower() == "true"
    
    # セキュリティ設定
    secret_key: str = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
    access_token_expire_minutes: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
    
    # CORS設定 - Vercelフロントエンド対応
    allowed_origins: list = [
        "http://localhost:3000", 
        "http://127.0.0.1:3000",
        "https://*.vercel.app",
        os.getenv("FRONTEND_URL", "")
    ]
    
    # Vercel環境判定
    is_vercel: bool = os.getenv("VERCEL", "").lower() == "1"
    
    class Config:
        env_file = ".env"

settings = Settings()