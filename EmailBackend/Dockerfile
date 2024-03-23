# pull official base image
FROM python:3.11.4-slim-buster

# set work directory
WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip
RUN pip install --upgrade setuptools
# install pkg-config for mysqlclient
RUN apt-get update && apt-get install -y \
    build-essential \
    default-libmysqlclient-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

COPY ./requirements.txt .
RUN pip install -r requirements.txt

# copy project
COPY . .

EXPOSE 8000

# Copy your entrypoint script into the image
COPY entrypoint.sh .

# Make your entrypoint script executable
RUN chmod +x entrypoint.sh

# Define your entrypoint script to be executed
ENTRYPOINT ["./entrypoint.sh"]

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]