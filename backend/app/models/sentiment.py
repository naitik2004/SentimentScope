from pydantic import BaseModel, Field
from typing import List, Literal
from datetime import datetime
import uuid

class SentimentRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=512)

class LabelScore(BaseModel):
    label: Literal['POSITIVE', 'NEGATIVE', 'NEUTRAL']
    score: float

class SentimentResult(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    text: str
    prediction: str
    confidence: float
    all_scores: List[LabelScore]
    timestamp: datetime = Field(default_factory=datetime.utcnow)
