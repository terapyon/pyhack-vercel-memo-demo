import pytest
import os
from app.core.config import settings

@pytest.mark.unit
def test_settings_default_values():
    """設定のデフォルト値テスト"""
    assert settings.api_host == "0.0.0.0"
    assert settings.api_port == 8000
    assert isinstance(settings.api_reload, bool)
    assert isinstance(settings.allowed_origins, list)
    assert "http://localhost:3000" in settings.allowed_origins

@pytest.mark.unit
def test_settings_database_url():
    """データベースURL設定テスト"""
    # デフォルトまたは環境変数からの値
    assert settings.database_url is not None
    assert isinstance(settings.database_url, str)
    assert "postgresql://" in settings.database_url or "sqlite://" in settings.database_url

@pytest.mark.unit
def test_settings_security():
    """セキュリティ設定テスト"""
    assert settings.secret_key is not None
    assert isinstance(settings.access_token_expire_minutes, int)
    assert settings.access_token_expire_minutes > 0