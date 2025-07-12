#!/usr/bin/env python3
"""
API動作確認用テストスクリプト
コンテナ内からAPIをテストするために使用
"""

import requests
import time
import sys

def test_api_endpoints():
    """APIエンドポイントをテスト"""
    base_url = "http://localhost:8000"
    
    endpoints = [
        "/",
        "/health", 
        "/api/test",
        "/api/db/test",
        "/api/db/check"
    ]
    
    print("=== API動作確認 ===")
    
    # サーバーの起動を待つ
    print("APIサーバーの起動を待機中...")
    for i in range(30):  # 30秒まで待機
        try:
            response = requests.get(f"{base_url}/health", timeout=5)
            if response.status_code == 200:
                print("✅ APIサーバーが起動しました")
                break
        except requests.exceptions.RequestException:
            time.sleep(1)
            continue
    else:
        print("❌ APIサーバーの起動を確認できませんでした")
        return False
    
    # 各エンドポイントをテスト
    success_count = 0
    for endpoint in endpoints:
        try:
            response = requests.get(f"{base_url}{endpoint}", timeout=10)
            if response.status_code == 200:
                print(f"✅ {endpoint}: OK")
                success_count += 1
            else:
                print(f"❌ {endpoint}: HTTP {response.status_code}")
        except requests.exceptions.RequestException as e:
            print(f"❌ {endpoint}: エラー - {e}")
    
    print(f"\n結果: {success_count}/{len(endpoints)} エンドポイントが正常")
    return success_count == len(endpoints)

if __name__ == "__main__":
    success = test_api_endpoints()
    sys.exit(0 if success else 1)