from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from ...core.connection_manager import manager

router = APIRouter()

@router.websocket("/sentiment")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Keep connection open, we don't expect messages from client
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)
