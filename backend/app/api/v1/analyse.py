from fastapi import APIRouter, Depends, HTTPException
from ...models.sentiment import SentimentRequest, SentimentResult
from ...core.hf_client import classify_text
from ...core.connection_manager import manager
from ...utils.sanitise import sanitise_text
from datetime import datetime

router = APIRouter()

@router.post("/analyse", response_model=SentimentResult)
async def analyse_sentiment(request: SentimentRequest):
    # Sanitise
    clean_text = sanitise_text(request.text)
    
    # Classify
    scores = await classify_text(clean_text)
    
    if not scores:
        raise HTTPException(status_code=500, detail="Failed to get prediction from model.")

    # Top result
    top_result = scores[0]
    
    result = SentimentResult(
        text=clean_text[:100] + ("..." if len(clean_text) > 100 else ""),
        prediction=top_result.label,
        confidence=top_result.score,
        all_scores=scores,
        timestamp=datetime.utcnow()
    )
    
    # Broadcast to WebSockets
    await manager.broadcast(result.dict())
    
    return result
