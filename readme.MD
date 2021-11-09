# Installation API

```
python, Django, and React project
```

## dependency required:

- Python 3.9.2
- venv => Installation with `pip install venv`
- IDE

## Installation Step:

- make virtual environtment with venv with `python -m venv`
- activate env file with `source {name_folder environtment}/Scripts/activate`
- make sure your virtual environtment active before install library
- install library using requirements.txt file with pip=> `pip install -r requirements.txt`
- change directory to **backend_controller** folder

## installation database:

- you must install postgresql in local or using docker
- see in **settings.py** file and scroll down until database configuration
- change value of configuration with your local postgre configuration
- after that, make sure your directory in **DJANGO_API/backend_controller**
- running command `python manage.py migrate` , database will make table from model in this project

## Running Api Server

- for running server, insert command with `python manage.py runserver`
