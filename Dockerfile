FROM python:3.14.3-slim-bookworm AS builder

ARG POETRY_VERSION=1.8.3
ARG POETRY_GROUPS=main

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    POETRY_HOME=/opt/poetry \
    POETRY_VIRTUALENVS_CREATE=false \
    PATH="/opt/poetry/bin:$PATH"

RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends \
        curl \
        build-essential \
        && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

RUN curl -sSL https://install.python-poetry.org | python3 - --version $POETRY_VERSION && \
    poetry --version

WORKDIR /app

COPY pyproject.toml poetry.lock ./

RUN --mount=type=cache,target=/root/.cache/pypoetry \
    poetry config virtualenvs.create false && \
    poetry install --no-interaction --no-ansi --no-root \
        $( [ "$POETRY_GROUPS" = "main" ] && echo "--only main" || echo "--with $POETRY_GROUPS" )

FROM python:3.14.3-slim-bookworm AS runtime

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

COPY --from=builder /usr/local/lib/python3.14/site-packages /usr/local/lib/python3.14/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

COPY --chmod=644 pyproject.toml manage.py ./
COPY hello/ ./hello/

RUN mkdir -p /app/static /app/media && \
    addgroup --system --gid 1000 app && \
    adduser  --system --uid 1000 --ingroup app --no-create-home app && \
    chown -R app:app /app

COPY --chmod=755 <<'EOF' /entrypoint.sh
#!/bin/bash
set -e

if [ -f manage.py ]; then
    echo "→ Running collectstatic (if needed)..."
    python manage.py collectstatic --noinput --clear || true
fi

exec "$@"
EOF

USER app

EXPOSE 8000

ENTRYPOINT ["/entrypoint.sh"]
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "hello.wsgi:application"]