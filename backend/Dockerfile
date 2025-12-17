FROM python:3.12-slim

WORKDIR /app

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Install uv
RUN pip install --no-cache-dir uv

# Copy dependency files first (better caching)
COPY pyproject.toml uv.lock ./

# Install dependencies
RUN uv sync --frozen

# Copy app code
COPY . .

# Expose FastAPI port
EXPOSE 8000

CMD ["uv", "run", "uvicorn",   "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]