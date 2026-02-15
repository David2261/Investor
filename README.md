# InvestorSite

Web platform for investors and traders to publish articles, discuss market trends, and follow financial news.

---

## Overview

InvestorSite is a full-stack web application built with Django and a modern frontend stack.
The platform allows users to:

* publish financial articles
* discuss market trends in comments
* follow investment-related news
* interact with other traders and investors

---

## Tech Stack

### Backend

* Python / Django
* Django REST Framework
* JWT authentication
* Celery + Redis (background tasks)
* PostgreSQL

### Frontend

* React
* Node.js

### Infrastructure

* Docker / Docker Compose
* Gunicorn (production server)
* Whitenoise (static files)

---

## Project Setup

### 1. Clone repository

```bash
git clone <repo_url>
cd InvestorSite
```

---

### 2. Environment setup (Poetry)

Install dependencies:

```bash
poetry install --with dev,test
```

Activate environment:

```bash
poetry shell
```

---

### 3. Database setup

```bash
python manage.py makemigrations
python manage.py migrate
```

Create superuser:

```bash
python manage.py createsuperuser
```

---

### 4. Run backend

```bash
python manage.py runserver
```

---

### 5. Run frontend

```bash
cd hello/apps/frontend
npm install
npm run dev
```

---

## Running with Docker

### Development build

```bash
docker build --build-arg POETRY_GROUPS="dev,test" -t hello:dev .
```

### Test build

```bash
docker build --build-arg POETRY_GROUPS=test -t hello:test .
```

### Production build

```bash
docker build --build-arg POETRY_GROUPS=main -t hello:prod .
```

---

## Running Tests

```bash
pytest
```

---

## Project Structure

```
hello/
 ├── apps/
 │   ├── articles
 │   ├── authentication
 │   ├── adminpanel
 │   ├── bonds
 │   └── segregation
 ├── settings.py
 └── celery.py
```

---

## Features

* Article publishing system
* Categories and tagging
* User authentication with JWT
* Image uploads
* Background tasks via Celery
* API-first architecture

---

## License

MIT License

---

## Environment Variables

Create a `.env` file in the project root and define the following variables:

```env
FRONTEND_HOST=http://localhost:5173/
REDIS_BROKER_URL=redis://localhost:6379/0

EMAIL_HOST_USER=whoever_example@gmail.com
EMAIL_HOST_PASSWORD=your_app_password_here

SECRET_KEY=your_django_secret_key
DEBUG=False

POSTGRES_DB=ih_data
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_db_password
POSTGRES_HOST=db
PGDATA=/var/lib/postgresql/data/pgdata

OAUTH_GOOGLE_SECRET=your_google_secret
OAUTH_GOOGLE_CLIENTID=your_google_client_id

OAUTH_YANDEX_CLIENTID=your_yandex_client_id
OAUTH_YANDEX_SECRET=your_yandex_secret

OAUTH_MICROSOFT_CLIENTID=your_microsoft_client_id
OAUTH_MICROSOFT_SECRET=your_microsoft_secret
```

