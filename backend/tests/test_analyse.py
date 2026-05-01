import pytest

def test_analyse_endpoint(client):
    response = client.post("/v1/analyse", json={"text": "I love this project!"})
    assert response.status_code == 200
    data = response.json()
    assert "prediction" in data
    assert data["prediction"] == "POSITIVE"
    assert "confidence" in data
    assert data["confidence"] == 0.9

def test_analyse_validation(client):
    # Too short
    response = client.post("/v1/analyse", json={"text": ""})
    assert response.status_code == 422
    
    # Too long
    response = client.post("/v1/analyse", json={"text": "a" * 513})
    assert response.status_code == 422
