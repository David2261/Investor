
FROM python:3.10-slim

RUN mkdir code

WORKDIR code

ADD requirements.txt /code/


RUN pip install --upgrade pip

RUN pip install -r requirements.txt


ADD . /code/

ADD .env.docker /code/.env

ENV APP_NAME=Investor

RUN python manage.py makemigrations
RUN python manage.py migrate

CMD gunicorn hello.wsgi:application -b 127.0.0.1:8000

