
FROM python:3.13.0a2-slim

RUN mkdir code

WORKDIR /code

ADD requirements.txt /code/


RUN pip install --upgrade pip

RUN pip install -r requirements.txt


ADD . /code/

ADD .env.docker /code/.env

ENV APP_NAME=Investor

RUN python3.11 manage.py makemigrations
RUN python3.11 manage.py migrate

CMD gunicorn hello.wsgi:application -b 127.0.0.1:8000

