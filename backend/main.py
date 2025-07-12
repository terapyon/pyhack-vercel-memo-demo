from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# 環境変数の読み込み
load_dotenv()

app = FastAPI(
    title="Memo App API",
    description="メモアプリのバックエンドAPI",
    version="1.0.0"
)

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # フロントエンド用
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """ルートエンドポイント - API動作確認用"""
    return {"message": "Memo App API is running!"}

@app.get("/health")
async def health_check():
    """ヘルスチェックエンドポイント"""
    return {"status": "healthy", "message": "API server is running"}

@app.get("/api/test")
async def test_endpoint():
    """テスト用エンドポイント"""
    return {
        "message": "Test endpoint is working",
        "database_url": os.getenv("DATABASE_URL", "Not configured"),
        "api_port": os.getenv("API_PORT", "8000")
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("API_PORT", 8000))
    host = os.getenv("API_HOST", "0.0.0.0")
    reload = os.getenv("API_RELOAD", "True").lower() == "true"
    
    uvicorn.run("main:app", host=host, port=port, reload=reload)