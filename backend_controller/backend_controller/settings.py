from pathlib import Path
import os
from datetime import timedelta

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-w5wl@v7&n0kqnyypuh0qp+h85y@6#5cjx4e@77=36_s(d!=v6i'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

CORS_ORIGIN_ALLOW_ALL = True
ALLOWED_HOSTS = ['*']
CORS_ALLOW_CREDENTIALS = True
AUTH_USER_MODEL = 'user.User'

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # third party
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    'huey.contrib.djhuey',
    # apps
    'api',
    'user',
    'ml',

    # docs
    'drf_yasg'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware'
]

REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 15,
    # 'DEFAULT_AUTHENTICATION_CLASSES': [
    #     'rest_framework_simplejwt.authentication.JWTAuthentication',
    # ],
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',
    )
}

ROOT_URLCONF = 'backend_controller.urls'

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

WSGI_APPLICATION = 'backend_controller.wsgi.application'

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql_psycopg2',
#         'NAME': 'postgres',
#         'USER': 'user',
#         'PASSWORD': '12345678',
#         'HOST': 'postgres',
#         'PORT': 5432
#     }
# }

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'backend',
        'USER': 'postgres',
        'PASSWORD': '3010',
        'HOST': 'localhost',
        'PORT': 5432
    }
}

CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://localhost:6379/0",  # Local Link provided by the redis-server command
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        }
    }
}

HUEY = {
    'huey_class': 'huey.RedisHuey',  # Huey implementation to use.
    'name': 'ml',  # Use db name for huey.
    'immediate': False,  # If DEBUG=True, run synchronously.
    'connection': {
        'host': 'redis',
        'port': 6379,
        'db': 0
    },
    'consumer': {
        'workers': 4,
        'worker_type': 'thread',
        'periodic': True,  # Enable crontab feature.
        'check_worker_health': True,  # Enable worker health checks.
        'health_check_interval': 20,  # Check worker health every second.
    },
}

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

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
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Jakarta'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# url
APPEND_SLASH = False
