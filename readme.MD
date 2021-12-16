# Installation API

```
python, Django, and React project
```

## dependency required:

- Python 3.9.2
- venv => Installation with `pip install venv`
- IDE

## Installation Step:

- change directory to **backend_controller** folder
- make virtual environtment with venv with `python -m venv {folder name}` in backend_controller directory folder
- activate env file with `source {name_folder environtment}/Scripts/activate`
- make sure your virtual environtment active before install library
- install library using requirements.txt file with pip=> `pip install -r requirements.txt`

## installation database on local:

- you must install postgresql in local
- create database server in pgadmin
- see in **settings.py** file and scroll down until database configuration
- change value of configuration with your local postgre configuration
- after that, make sure your directory in **DJANGO_API/backend_controller**
- running command `python manage.py migrate` , database will make table from model in this project

## installation with docker:
- in root directory. running **docker-compose.yml** file with `docker-compose build`
- docker will install images container base on its file
- dont change database configuration on settings.py with `docker file` comments tag code if running django project with docker

## Running Api Server
- for running server, insert command with `python manage.py runserver` or if using docker insert command `docker-compose up` in terminal

## Installation React admin-dashboard
- install node.js and npm
- in admin-dashboard folder, install library with `npm install`
- to running program, using `npm run start`

## Documentation API
- access localhost:8000/docs for API Documentation