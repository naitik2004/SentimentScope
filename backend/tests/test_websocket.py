from fastapi.testclient import TestClient
from ..app.main import app

def test_websocket_connection():
    client = TestClient(app)
    with client.websocket_connect("/ws/sentiment") as websocket:
        data = websocket.receive_json()
        assert data["type"] == "history"
        assert "payload" in data
        assert isinstance(data["payload"], list)

def test_websocket_broadcast():
    client = TestClient(app)
    with client.websocket_connect("/ws/sentiment") as websocket:
        # Initial history
        websocket.receive_json()
        
        # Trigger an analysis to check broadcast
        response = client.post("/v1/analyse", json={"text": "Test broadcast"})
        assert response.status_code == 200
        
        # Receive broadcasted result
        data = websocket.receive_json()
        assert data["type"] == "result"
        assert data["payload"]["prediction"] == "POSITIVE"
