from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app.core.config import settings
from app.db.database import get_db, test_database_connection

app = FastAPI(
    title="Memo App API",
    description="メモアプリのバックエンドAPI",
    version="1.0.0"
)

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
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
        "database_url_configured": settings.database_url is not None,
        "api_port": settings.api_port
    }

@app.get("/api/db/test")
async def test_database():
    """データベース接続テスト"""
    return test_database_connection()

@app.get("/api/db/check")
async def check_database_session(db: Session = Depends(get_db)):
    """データベースセッション確認"""
    try:
        # 簡単なクエリでセッションをテスト
        result = db.execute("SELECT 1 as test")
        test_value = result.fetchone()
        return {
            "status": "success", 
            "message": "Database session is working",
            "test_query_result": test_value[0] if test_value else None
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database session error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app", 
        host=settings.api_host, 
        port=settings.api_port, 
        reload=settings.api_reload
    )