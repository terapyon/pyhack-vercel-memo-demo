import pytest
from fastapi.testclient import TestClient

@pytest.mark.api
def test_root_endpoint(client: TestClient):
    """ルートエンドポイントのテスト"""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Memo App API is running!"}

@pytest.mark.api
def test_health_endpoint(client: TestClient):
    """ヘルスチェックエンドポイントのテスト"""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "message" in data

@pytest.mark.api
def test_test_endpoint(client: TestClient):
    """テストエンドポイントのテスト"""
    response = client.get("/api/test")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert "database_url_configured" in data
    assert "api_port" in data

@pytest.mark.api
def test_database_test_endpoint(client: TestClient):
    """データベーステストエンドポイントのテスト"""
    response = client.get("/api/db/test")
    assert response.status_code == 200
    data = response.json()
    assert "status" in data
    assert "message" in data

@pytest.mark.api
def test_database_check_endpoint(client: TestClient):
    """データベースセッションチェックエンドポイントのテスト"""
    response = client.get("/api/db/check")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert "message" in data
    assert "test_query_result" in data