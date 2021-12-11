FROM python:3

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /api

COPY . ./backend_controller
COPY env

RUN pip install -r requirements.txt