# SnoopJake Email Backend

## Features

- Send emails through a web interface.
- Manage and store emails in PostgreSQL.
- RESTful API for interacting with the email system, users and folders

## Technologies Used

- [Django](https://www.djangoproject.com/)
- [Django Rest Framework](https://www.django-rest-framework.org/)
- [PostgreSQL](https://www.postgresql.org/)

## Requirements

- Python 3.11 or higher
- Django 5 or higher
- Django Rest Framework
- PostgreSQL

## Environment Setup

1. Clone the repository:

```bash
git clone git@github.com/Tech-Fellows-SnoopJake/EmailServer
cd EmailBackend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
python manage.py makemigrations emailapp
python manage.py migrate
python manage.py runserver
```

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file in the project root directory. Do not include sensitive information directly in your project files or documentation.

```bash
DJANGO_SECRET_KEY='your_secret_key_here'
DEBUG='True' # Set to 'False' in production
DB_NAME='your_postgres_db_name'
DB_USER='your_postgres_user'
DB_PASSWORD='your_postgres_password'
DB_HOST='your_postgres_host'
DB_PORT='your_postgres_port'
ALLOWED_HOSTS='your_domain.com,www.your_domain.com'
```

## Usage

- Access http://localhost:8000/ in your browser to interact with the application.

1 testing CI_back workflow
2 checking changes in migrations
3 I'm back!
