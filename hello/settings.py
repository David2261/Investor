import os
import sys
from django.urls import reverse_lazy
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
	'corsheaders',
	'rest_framework',
	'rest_framework.authtoken',
	'djoser',
	# apps
	'leads.apps.LeadsConfig',
	'articles.apps.ArticlesConfig',
	'authentication.apps.AuthenticationConfig',
	'bonds.apps.BondsConfig',
	# admin
	'grappelli.dashboard',
	'grappelli',
	'tinymce',
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
]

ROOT_URLCONF = 'hello.urls'


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
	'default': {
		'ENGINE': 'django.db.backends.sqlite3',
		'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
	}
	# 'default': {
	#     'ENGINE': 'django.db.backends.postgresql',
	#     'NAME': 'postgres',
	#     'USER': env('USER'),
	#     'PASSWORD': env('PASSWORD_SQL'),
	#     'HOST': '127.0.0.1',
	#     'PORT': 5432
	# }
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
LOGIN_REDIRECT_URL = reverse_lazy("articles:home_page")
LOGOUT_REDIRECT_URL = reverse_lazy("articles:home_page")
AUTH_USER_MODEL = 'authentication.User'

# DRF
REST_FRAMEWORK = {
	'DEFAULT_AUTHENTICATION_CLASSES': [
		'rest_framework.authentication.TokenAuthentication',
		'rest_framework.authentication.BasicAuthentication',
		'rest_framework.authentication.SessionAuthentication',
	],
	'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema',
	'DEFAULT_PERMISSION_CLASSES': (
		'rest_framework.permissions.AllowAny',
		# 'rest_framework.permissions.IsAuthenticated',
	),
	'DEFAULT_RENDERER_CLASSES': (
		'rest_framework.renderers.JSONRenderer',
	),
	'EXCEPTION_HANDLER': (
		'rest_framework.views.exception_handler',
	),
	'DEFAULT_PARSER_CLASSES': (
		'rest_framework.parsers.JSONParser',
	),
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

# Admin
GRAPPELLI_INDEX_DASHBOARD = 'hello.dashboard.CustomIndexDashboard'
GRAPPELLI_INDEX_DASHBOARD = {  # alternative method
	'hello.admin.admin_site': 'hello.dashboard.CustomIndexDashboard',
}
