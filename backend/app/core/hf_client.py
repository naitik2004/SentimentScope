import httpx
from ..config import settings
from ..models.sentiment import LabelScore
from fastapi import HTTPException
from typing import List

async def classify_text(text: str) -> List[LabelScore]:
    headers = {}
    if settings.HF_API_TOKEN:
        headers["Authorization"] = f"Bearer {settings.HF_API_TOKEN}"

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                settings.HF_API_URL,
                json={"inputs": text},
                headers=headers,
                timeout=10.0
            )
            response.raise_for_status()
            
            # HuggingFace returns a list of lists: [[{label, score}, ...]]
            data = response.json()
            
            # Handle case where it returns a single list instead of nested list
            if isinstance(data, list) and len(data) > 0:
                if isinstance(data[0], list):
                    scores = data[0]
                else:
                    scores = data
            else:
                raise HTTPException(status_code=502, detail="Unexpected response format from Model Hub")

            parsed_scores = []
            for item in scores:
                label = item['label'].upper()
                # Ensure label matches our Literal
                if label not in ['POSITIVE', 'NEGATIVE', 'NEUTRAL']:
                    # Some models use different labels, we might need mapping
                    if label in ['LABEL_0', '0']: label = 'NEGATIVE'
                    elif label in ['LABEL_1', '1']: label = 'NEUTRAL'
                    elif label in ['LABEL_2', '2']: label = 'POSITIVE'
                    else: continue
                
                parsed_scores.append(LabelScore(label=label, score=item['score']))
            
            # Sort by score descending
            parsed_scores.sort(key=lambda x: x.score, reverse=True)
            return parsed_scores

        except httpx.TimeoutException:
            raise HTTPException(status_code=504, detail="Model endpoint timed out.")
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=f"Model Hub Error: {e.response.text}")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
