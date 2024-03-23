"""
Django settings for emailprototype project.

Generated by 'django-admin startproject' using Django 5.0.2.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

import os
from datetime import timedelta
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['*']
# Application definition

INSTALLED_APPS = [
    'clearcache',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'emailapp',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist'
]


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]

ROOT_URLCONF = 'emailprototype.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

AUTH_USER_MODEL = "emailapp.User"

# JWT
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
    # Lifetime of the access token. After this duration, the access token expires
    # and the user needs to re-authenticate to obtain a new one.

    'REFRESH_TOKEN_LIFETIME': timedelta(days=15),
    # Lifetime of the refresh token. After this duration, the refresh token expires
    # and the user needs to perform a full login to obtain new tokens.

    'ROTATE_REFRESH_TOKENS': True,
    # Controls whether refresh tokens are rotated when a new access token is issued.
    # If set to True, a new refresh token will be issued along with each new access token.

    'BLACKLIST_AFTER_ROTATION': True,
    # Controls whether previously issued refresh tokens are blacklisted after rotation.
    # If set to True, any previous refresh tokens will be invalidated when a new one is issued.

    'UPDATE_LAST_LOGIN': False,
    # Determines whether the last login timestamp of the user is updated
    # whenever a token is refreshed or a new token is generated.
    # Here, it's set to False, meaning the last login timestamp won't be automatically updated.

    'ALGORITHM': 'HS256',
    # Sets the algorithm used to sign the JWT tokens.
    # Here, it's set to HS256, a symmetric-key algorithm that uses a shared secret key for signing and verification.

    'VERIFYING_KEY': None,
    # Specifies the key used for verifying JWT tokens.
    # In this case, it's set to None, implying a symmetric key approach.

    'AUDIENCE': None,
    # Sets the audience claim of the JWT token.

    'ISSUER': None,
    # Sets the issuer claim of the JWT token.

    'JWK_URL': None,
    # Specifies the URL to obtain the JSON Web Key (JWK) set.

    'LEEWAY': 0,
    # Specifies the amount of leeway time allowed for token expiration verification.

    'AUTH_HEADER_TYPES': ('Bearer',),
    # Specifies the types of authentication headers accepted.
    # Here, it's set to ('Bearer',) which is the most commonly used type.

    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    # Sets the name of the HTTP header used to send the authentication token.

    'USER_ID_FIELD': 'id',
    # Specifies the name of the field used to identify the user.

    'USER_ID_CLAIM': 'user_id',
    # Specifies the name of the claim that stores the user ID in the JWT token.

    'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',
    # Specifies the authentication rule for users.

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    # Specifies the classes of authentication tokens accepted by the system.

    'TOKEN_TYPE_CLAIM': 'token_type',
    # Specifies the claim storing the type of token.

    'TOKEN_USER_CLASS': 'rest_framework_simplejwt.models.TokenUser',
    # Specifies the class representing the user associated with the token.

    'JTI_CLAIM': 'jti',
    # Specifies the claim storing the unique identifier of the JWT token.

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    # Specifies the claim storing the expiration time for sliding token refresh.

    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    # Specifies the lifetime of the access token for sliding token refresh.

    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
    # Specifies the maximum lifetime of a sliding token refresh.
}


WSGI_APPLICATION = 'emailprototype.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'HOST': os.getenv('DB_HOST'),
        'PORT': os.getenv('DB_PORT'),
    }
}

CORS_ALLOW_ALL_ORIGINS = True

# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Just a fake domain :P
FAKE_DOMAIN = '@snoopjake.com'
