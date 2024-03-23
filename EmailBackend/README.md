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

<<<<<<< Updated upstream
# Changes by HG 00

- Implementation of JWT for user login and session management as well as to protect the transfer of information.
- The database type has been changed to **MySql**. For deployment, we have created a record in SonarCloud.
- Fixed an error with the environment variables for database creation from CI. They are set as secrets, and the file with
the variables is not needed in the instance.
- Updated GitHub Actions.
- SUDO actions with Docker were modified due to permission assignment `sudo usermod -aG docker ubuntu`, in addition to 
Docker's update and installation.
- Migrations are automated with a .sh file and a *RUN* task in the Docker file. This should work on the first deployment. 
Otherwise, a first `python manage.py makemigrations emailapp` and `python manage.py migrate` must be done.
- Proper format of best practices for variable and class names in the .py files has been applied.

### Special Considerations

- The GHCR path of the user, which is commented, and the EC2 instance need to be changed.
- Environment variables for database access need to be set.
- An RDS for MySql with ACL for MySql, SSH, and HTTP needs to be deployed.
- Update the EC2_SSH_KEY for SSH connection.
- For the docker group permissions to the ubuntu user to take effect, relogging is necessary.
- If changes are made to the Database Schema, conflicts with migrations and the stored cache should be considered.

### Resources

Postman APIs of the project with Json formats. Tests are not applied but could be a good option from
[Postman](https://www.postman.com/valwolfor/workspace/jake-email/request/23052922-895a334c-342e-4519-bbc9-0ff67e8a2ee5).

=======
>>>>>>> Stashed changes
