from fastapi import WebSocket
from typing import List, Dict
import json

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.history: List[Dict] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        # Send history on connect
        await websocket.send_json({
            "type": "history",
            "payload": self.history[-50:]
        })

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: Dict):
        # Update internal history
        self.history.append(message)
        if len(self.history) > 100:
            self.history = self.history[-100:]

        # Create broadcast message
        broadcast_msg = {
            "type": "result",
            "payload": message
        }

        # Send to all active connections
        disconnected = []
        for connection in self.active_connections:
            try:
                await connection.send_json(broadcast_msg)
            except Exception:
                disconnected.append(connection)
        
        # Clean up dead connections
        for conn in disconnected:
            self.disconnect(conn)

manager = ConnectionManager()
