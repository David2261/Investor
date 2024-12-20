import os
import sys
from datetime import timedelta
from django.urls import reverse_lazy
from celery.schedules import crontab
from .cache import CACHES
import environ

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

PROJECT_ROOT = os.path.dirname(__file__)
sys.path.insert(0, os.path.join(PROJECT_ROOT, 'apps'))

filename = f"{BASE_DIR}/__logs__/error.log"
os.makedirs(os.path.dirname(filename), exist_ok=True)
with open(filename, "w") as f:
	f.write("")

# Логгирование
LOGGING = {
	"version": 1,
	"disable_existing_loggers": False,
	"formatters": {
		"standart": {
			"format": "%(asctime)s - %(filename)s - %(name)s - %(message)s",
			"datefmt": "%Y-%m-%d %H:%M:%S",
		},
		"exception": {
			"format": "%(asctime)s - [%(levelname)s] - %(name)s \
			- (%(filename)s).%(funcName)s((%lineno)d) - %(message)s",
			"datefmt": "%Y-%m-%d %H:%M:%S",
		}
	},
	"handlers": {
		"file": {
			"level": "INFO",
			"class": "logging.FileHandler",
			"formatter": "standart",
			"filename": f'{BASE_DIR}/__logs__/main.log',
		},
		"dev_file": {
			"level": "NOTSET",
			"class": "logging.FileHandler",
			"formatter": "exception",
			"filename": f'{BASE_DIR}/__logs__/error.log',
		},
	},
	"loggers": {
		"root": {
			"handlers": ["file"],
			"level": "INFO",
		},
		"dev": {
			"handlers": ["dev_file"],
			"level": "ERROR",
		},
	},
}

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

env = environ.Env()
environ.Env.read_env(env_file=os.path.join(BASE_DIR, '.env'))
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env('DEBUG')

if DEBUG == True:
	APPEND_SLASH = False

ALLOWED_HOSTS = []


INSTALLED_APPS = [
	'django.contrib.admin',
	'django.contrib.auth',
	'django.contrib.contenttypes',
	'django.contrib.sessions',
	'django.contrib.messages',
	'django.contrib.staticfiles',
	'django.contrib.sites',
	# Authentication and API
	'allauth',
	'allauth.account',
	'allauth.socialaccount',
	'corsheaders',
	'rest_framework',
	'rest_framework_simplejwt.token_blacklist',
	'djoser',
	'rest_auth',
	'django_filters',
	# apps
	'articles.apps.ArticlesConfig',
	'authentication.apps.AuthenticationConfig',
	'bonds.apps.BondsConfig',
	# admin
	'adminpanel.apps.AdminpanelConfig',
]

SITE_ID = 1

MIDDLEWARE = [
	'django.middleware.security.SecurityMiddleware',
	'corsheaders.middleware.CorsMiddleware',
	'whitenoise.middleware.WhiteNoiseMiddleware',
	'django.contrib.sessions.middleware.SessionMiddleware',
	'django.middleware.common.CommonMiddleware',
	'django.middleware.csrf.CsrfViewMiddleware',
	'django.contrib.auth.middleware.AuthenticationMiddleware',
	'django.contrib.messages.middleware.MessageMiddleware',
	'django.middleware.clickjacking.XFrameOptionsMiddleware',
	"allauth.account.middleware.AccountMiddleware",
]

ROOT_URLCONF = 'hello.urls'

AUTHENTICATION_BACKENDS = [
	'django.contrib.auth.backends.ModelBackend',
	'allauth.account.auth_backends.AuthenticationBackend',
]


SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = env('OAUTH_GOOGLE_CLIENTID')
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = env('OAUTH_GOOGLE_SECRET')

SOCIAL_AUTH_YANDEX_OAUTH2_KEY = env('OAUTH_YANDEX_CLIENTID')
SOCIAL_AUTH_YANDEX_OAUTH2_SECRET = env('OAUTH_YANDEX_SECRET')

SOCIAL_AUTH_MICROSOFT_OAUTH2_KEY = env('OAUTH_MICROSOFT_CLIENTID')
SOCIAL_AUTH_MICROSOFT_OAUTH2_SECRET = env('OAUTH_MICROSOFT_SECRET')


SOCIALACCOUNT_PROVIDERS = {
	'google': {
		'APP': 'google',
		'SCOPE': [
			'profile',
			'email',
		],
		'AUTH_PARAMS': {
			'access_type': 'online',
		}
	},
	'microsoft': {
		'APP': 'microsoft',
		'SCOPE': [
			'profile',
			'email',
		],
	},
	'yandex': {
		'APP': 'yandex',
		'SCOPE': [
			'profile',
			'email',
		],
	}
}

ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_UNIQUE_EMAIL = True

TEMPLATES = [
	{
		'BACKEND': 'django.template.backends.django.DjangoTemplates',
		'DIRS': [
			os.path.join(PROJECT_ROOT, 'templates'),
		],
		'APP_DIRS': True,
		'OPTIONS': {
			'context_processors': [
				'django.template.context_processors.debug',
				'django.template.context_processors.request',
				'django.contrib.auth.context_processors.auth',
				'django.contrib.messages.context_processors.messages',
				'django.template.context_processors.media',
			],
		},
	},
]

WSGI_APPLICATION = 'hello.wsgi.application'

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
	# 'default': {
	# 	'ENGINE': 'django.db.backends.sqlite3',
	# 	'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
	# }
	'default': {
		'ENGINE': 'django.db.backends.postgresql',
		'NAME': env('POSTGRES_DB'),
		'USER': env('POSTGRES_USER'),
		'PASSWORD': env('POSTGRES_PASSWORD'),
		'HOST': 'localhost',
		'PORT': '5432',
	}
}

CORS_ORIGIN_ALLOW_ALL = True
# CORS_ALLOWED_ORIGINS = [
# 	"http://localhost:8080",
# 	"http://127.0.0.1:8000",
# 	"http://localhost:5173/",
# ]

"""
DATABASES = {
	'default': {
	'ENGINE': 'django.db.backends.postgresql_psycopg2',
	'PORT': '5432'
	}
}
"""

# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

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

# Default redirect after auth
LOGIN_REDIRECT_URL = reverse_lazy("authentication:user_login")
LOGOUT_REDIRECT_URL = "/"
AUTH_USER_MODEL = 'authentication.User'

# DRF
REST_FRAMEWORK = {
	'DEFAULT_AUTHENTICATION_CLASSES': [
		'rest_framework_simplejwt.authentication.JWTAuthentication',
		'rest_framework.authentication.BasicAuthentication',
		'rest_framework.authentication.SessionAuthentication',
	],
	'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema',
	'DEFAULT_PERMISSION_CLASSES': [
		'rest_framework.permissions.AllowAny',
		# 'rest_framework.permissions.IsAuthenticated',
	],
	'EXCEPTION_HANDLER': 'rest_framework.views.exception_handler',
	'DEFAULT_PARSER_CLASSES': [
		'rest_framework.parsers.JSONParser',
		'rest_framework.parsers.MultiPartParser',
        'rest_framework.parsers.FormParser',
	],
	'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
	'PAGE_SIZE': 5,
}

# Authentification JWT
SIMPLE_JWT = {
	"ACCESS_TOKEN_LIFETIME": timedelta(minutes=5),
	"REFRESH_TOKEN_LIFETIME": timedelta(days=90),
	"ROTATE_REFRESH_TOKENS": True,
	"BLACKLIST_AFTER_ROTATION": True,
	"UPDATE_LAST_LOGIN": False,

	"ALGORITHM": "HS256",
	"SIGNING_KEY": SECRET_KEY,
	"VERIFYING_KEY": "",
	"AUDIENCE": None,
	"ISSUER": None,
	"JSON_ENCODER": None,
	"JWK_URL": None,
	"LEEWAY": 0,

	"AUTH_HEADER_TYPES": ("Bearer",),
	"AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
	"USER_ID_FIELD": "id",
	"USER_ID_CLAIM": "user_id",
	"USER_AUTHENTICATION_RULE": "rest_framework_simplejwt.authentication.default_user_authentication_rule",

	"AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
	"TOKEN_TYPE_CLAIM": "token_type",
	"TOKEN_USER_CLASS": "rest_framework_simplejwt.models.TokenUser",

	"JTI_CLAIM": "jti",

	"SLIDING_TOKEN_REFRESH_EXP_CLAIM": "refresh_exp",
	"SLIDING_TOKEN_LIFETIME": timedelta(minutes=5),
	"SLIDING_TOKEN_REFRESH_LIFETIME": timedelta(days=90),

	"TOKEN_OBTAIN_SERIALIZER": "authentication.serializers.TokenObtainPairSerializer",
	"TOKEN_REFRESH_SERIALIZER": "rest_framework_simplejwt.serializers.TokenRefreshSerializer",
	"TOKEN_VERIFY_SERIALIZER": "rest_framework_simplejwt.serializers.TokenVerifySerializer",
	"TOKEN_BLACKLIST_SERIALIZER": "rest_framework_simplejwt.serializers.TokenBlacklistSerializer",
	"SLIDING_TOKEN_OBTAIN_SERIALIZER": "rest_framework_simplejwt.serializers.TokenObtainSlidingSerializer",
	"SLIDING_TOKEN_REFRESH_SERIALIZER": "rest_framework_simplejwt.serializers.TokenRefreshSlidingSerializer",
}

# myaccount.google.com/lesssecureapps
# Email Settings
DEFAULT_FROM_EMAIL = ''
EMAIL_BACKEND = ''
EMAIL_HOST = ''
EMAIL_HOST_USER = ''
EMAIL_HOST_PASSWORD = ''
EMAIL_PORT = 587
EMAIL_USE_TLS = True
# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'ru-ru'

TIME_ZONE = 'Europe/Moscow'

DATE_FORMAT = '%B %d %Y'

USE_I18N = True

USE_L10N = True

USE_TZ = False

DEFAULT_AUTO_FIELD = 'django.db.models.AutoField'


# Celery
CELERY_BROKER_URL = env('REDIS_BROKER_URL')
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_TIMEZONE = TIME_ZONE
CELERY_BEAT_SCHEDULE = {
	'update-expired-bonds-every-day': {
		'task': 'bonds.tasks.update_expired_bonds_task',
		'schedule': crontab(hour=0, minute=0),
	},
}

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

MEDIA_ROOT = os.path.join(PROJECT_ROOT, 'media')
MEDIA_URL = '/media/'

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, "static")

STATICFILES_DIRS = [
	os.path.join(PROJECT_ROOT, "static"),
]

STATICFILES_FINDERS = [
	"django.contrib.staticfiles.finders.FileSystemFinder",
	"django.contrib.staticfiles.finders.AppDirectoriesFinder",
]


STORAGES = {
	"default": {
		"BACKEND": "django.core.files.storage.FileSystemStorage",
	},
	"staticfiles": {
		"BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage",
	},
}