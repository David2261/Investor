FROM python:3.14-slim-bookworm AS builder

ARG POETRY_VERSION=1.8.3
ARG POETRY_GROUPS=main
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    POETRY_HOME=/opt/poetry \
    POETRY_VIRTUALENVS_CREATE=false \
    PATH=/opt/poetry/bin:$PATH

# Установка зависимостей для сборки
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    build-essential \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Установка Poetry
RUN curl -sSL https://install.python-poetry.org | python3 - --version ${POETRY_VERSION} && \
    poetry --version && \
    which poetry

WORKDIR /app
COPY pyproject.toml poetry.lock ./

# Установка зависимостей с кэшированием
RUN --mount=type=cache,target=/root/.cache/pypoetry \
    if [ "${POETRY_GROUPS}" = "main" ]; then \
        poetry install --no-root --only main; \
    else \
        poetry install --no-root --with "${POETRY_GROUPS}"; \
    fi

FROM python:3.14-slim-bookworm AS runtime

WORKDIR /app

# Копируем только то, что реально нужно
COPY --from=builder /usr/local/lib/python3.14/site-packages /usr/local/lib/python3.14/site-packages
COPY --from=builder /usr/local/bin           /usr/local/bin

# Копируем код проекта
COPY . .


RUN mkdir -p /app/static /app/media


RUN set -ex; \
    if [ -f manage.py ]; then \
        poetry run python manage.py collectstatic --noinput || true; \
    fi

EXPOSE 8000
CMD ["gunicorn", "hello.wsgi:application", "--bind", "0.0.0.0:8000"]