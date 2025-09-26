FROM python:3.11-slim AS builder

ENV PYTHONDONTWRITEBYTECODE=1 \
	PYTHONUNBUFFERED=1 \
	POETRY_VERSION=1.8.3 \
	POETRY_HOME=/opt/poetry \
	POETRY_VIRTUALENVS_CREATE=false \
	PATH=/opt/poetry/bin:$PATH

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
RUN curl -sSL https://install.python-poetry.org | python3 - --version ${POETRY_VERSION} && \
	poetry --version && \
	which poetry

WORKDIR /app
COPY pyproject.toml poetry.lock ./
RUN --mount=type=cache,target=/root/.cache/pypoetry poetry install --no-root --only main

FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin
COPY . .

RUN mkdir -p /app/static /app/media

RUN python manage.py collectstatic --noinput

EXPOSE 8000
CMD ["gunicorn", "hello.wsgi:application", "--bind", "0.0.0.0:8000"]