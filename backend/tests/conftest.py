import pytest
from fastapi.testclient import TestClient
from httpx import AsyncClient
from ..app.main import app
from ..app.core.hf_client import classify_text
from ..app.models.sentiment import LabelScore

@pytest.fixture
def client():
    return TestClient(app)

@pytest.fixture
async def async_client():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac

@pytest.fixture(autouse=True)
def mock_hf_client(mocker):
    # Mocking classify_text to avoid real API calls during tests
    mock_response = [
        LabelScore(label="POSITIVE", score=0.9),
        LabelScore(label="NEUTRAL", score=0.08),
        LabelScore(label="NEGATIVE", score=0.02)
    ]
    return mocker.patch("app.api.v1.analyse.classify_text", return_value=mock_response)
