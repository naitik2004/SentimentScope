from pydantic_settings import BaseSettings
from typing import List, Literal

class Settings(BaseSettings):
    HF_API_URL: str = "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english"
    HF_API_TOKEN: str = ""
    MAX_TEXT_LENGTH: int = 512
    WS_MAX_CONNECTIONS: int = 50
    CORS_ORIGINS: List[str] = ["http://localhost:3030"]
    ENV: Literal["development", "production"] = "development"

    class Config:
        env_file = ".env"

settings = Settings()
