"""
Vercel用FastAPI エントリーポイント
"""
import sys
import os

# バックエンドディレクトリをパスに追加
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'backend'))

from backend.app.main import app

# Vercelのサーバーレス関数として実行
def handler(request, response):
    return app(request, response)

# デバッグ用
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)