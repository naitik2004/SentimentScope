from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.v1 import analyse, websocket
from .config import settings
import uvicorn

def create_app() -> FastAPI:
    app = FastAPI(title="SentimentScope API", version="1.0.0")

    # CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Routes
    app.include_router(analyse.router, prefix="/v1", tags=["Analysis"])
    app.include_router(websocket.router, prefix="/ws", tags=["Real-time"])

    @app.get("/health")
    async def health_check():
        return {
            "status": "ok", 
            "hf_endpoint": settings.HF_API_URL[:20] + "...",
            "env": settings.ENV
        }

    return app

app = create_app()

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)
