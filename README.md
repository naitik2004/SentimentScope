# SentimentScope

Real-Time Social Sentiment Dashboard powered by a fine-tuned DistilBERT model.

## Features
- **AI-Powered**: 3-class sentiment analysis (Positive, Negative, Neutral) using fine-tuned DistilBERT.
- **Real-Time**: Live updates via WebSockets for instant feedback.
- **Interactive Dashboards**: Visualise trends and distributions with Recharts.
- **Monorepo Architecture**: Clean separation of ML, Backend, and Frontend.

## Tech Stack
- **ML**: PyTorch, HuggingFace Transformers, Datasets, W&B.
- **Backend**: FastAPI, WebSockets, Pydantic, HTTPX.
- **Frontend**: Next.js 14, Recharts, Lucide, Vanilla CSS Modules.
- **Deployment**: Docker, HF Spaces, Vercel, Render.

## Getting Started

### Prerequisites
- Python 3.11+
- Node.js 20+
- Docker & Docker Compose

### Running Locally
1. **Clone the repository**
2. **Start with Docker Compose**:
   ```bash
   docker-compose up --build
   ```
3. **Access the application**:
   - Frontend: `http://localhost:3030`
   - Backend: `http://localhost:8080`
   - API Docs: `http://localhost:8080/docs`

## ML Pipeline
1. **Configure**: Edit `ml/configs/training_config.yaml`.
2. **Train**:
   ```bash
   pip install -r ml/requirements.txt
   python ml/src/train.py
   ```
3. **Push to Hub**:
   ```bash
   export HF_TOKEN=your_token
   python ml/src/push_to_hub.py
   ```

## License
MIT
