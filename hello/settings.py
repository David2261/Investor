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

LOG_DIR = os.path.join(BASE_DIR, '__logs__')
ERROR_LOG_FILE = os.path.join(LOG_DIR, 'error.log')
MAIN_LOG_FILE = os.path.join(LOG_DIR, 'main.log')

os.makedirs(LOG_DIR, exist_ok=True)

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
			"filename": MAIN_LOG_FILE,
		},
		"dev_file": {
			"level": "NOTSET",
			"class": "logging.FileHandler",
			"formatter": "exception",
			"filename": ERROR_LOG_FILE,
		},
	},
	"loggers": {
		"": {
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

ALLOWED_HOSTS = ['localhost', '127.0.0.1']


INSTALLED_APPS = [
	'django.contrib.admin',
	'django.contrib.auth',
	'django.contrib.contenttypes',
	'django.contrib.sessions',
	'django.contrib.messages',
	'django.contrib.staticfiles',
	'django.contrib.sites',
	'django.contrib.sitemaps',
	# Authentication and API
	'allauth',
	'allauth.account',
	'allauth.socialaccount',
	'corsheaders',
	'rest_framework',
	'rest_framework_simplejwt.token_blacklist',
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
	'corsheaders.middleware.CorsMiddleware',
	'django.middleware.security.SecurityMiddleware',
	'whitenoise.middleware.WhiteNoiseMiddleware',
	'django.contrib.sessions.middleware.SessionMiddleware',
	'django.middleware.common.CommonMiddleware',
	'django.middleware.csrf.CsrfViewMiddleware',
	'django.contrib.auth.middleware.AuthenticationMiddleware',
	'django.contrib.messages.middleware.MessageMiddleware',
	'django.middleware.clickjacking.XFrameOptionsMiddleware',
	'csp.middleware.CSPMiddleware',
	"allauth.account.middleware.AccountMiddleware",
]

CSP_DEFAULT_SRC = ("'self'",)
CSP_SCRIPT_SRC = ("'self'",)

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


DATABASES = {
	'default': {
		'ENGINE': 'django.db.backends.postgresql',
		'NAME': env('POSTGRES_DB'),
		'USER': env('POSTGRES_USER'),
		'PASSWORD': env('POSTGRES_PASSWORD'),
		'HOST': 'localhost',
		'PORT': '5432',
	}
}

CORS_ALLOW_ALL_ORIGINS = True

CORS_ALLOWED_ORIGINS = [
	"http://localhost:3000",
	"http://127.0.0.1:3000",
	"http://localhost:5137",
	"http://127.0.0.1:5137",
	"http://127.0.0.1:8000",
	"http://localhost:8080",
]
CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_METHODS = [
	"GET",
	"POST",
	"PUT",
	"PATCH",
	"DELETE",
	"OPTIONS",
]

CORS_ALLOW_HEADERS = [
	"content-type",
	"authorization",
	"x-csrftoken",
]

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
		'authentication.backends.CookieJWTAuthentication',
	],
	'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema',
	'DEFAULT_PERMISSION_CLASSES': [
		'rest_framework.permissions.IsAuthenticated',
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
	# Время жизни токенов
	"ACCESS_TOKEN_LIFETIME": timedelta(minutes=5),
	"REFRESH_TOKEN_LIFETIME": timedelta(days=1),
	"ROTATE_REFRESH_TOKENS": True,
	"BLACKLIST_AFTER_ROTATION": True,

	# Алгоритмы
	"ALGORITHM": "HS256",
	"SIGNING_KEY": SECRET_KEY,

	# Заголовки не используются, мы работаем через cookies
	'REFRESH_COOKIE': 'refresh_token',  # Название ключа в куки, в котором хранится refresh токен
	'AUTH_COOKIE': 'access_token',
	'AUTH_COOKIE_SECURE': False,  # Куки должны передаваться только по HTTPS (True для production)
	'AUTH_COOKIE_HTTP_ONLY': False,  # Запрет доступа к куки через JavaScript
	'AUTH_COOKIE_SAMESITE': 'Lax',  # Ограничение передачи куки при кросс-сайтовых запросах.


	# Пользователь
	"USER_ID_FIELD": "id",
	"USER_ID_CLAIM": "user_id",

	# Модель пользователя
	"TOKEN_USER_CLASS": "rest_framework_simplejwt.models.TokenUser",

	# Классы токенов
	"AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
	"TOKEN_TYPE_CLAIM": "token_type",
	"JTI_CLAIM": "jti",

	# Слайдинг (если используешь)
	"SLIDING_TOKEN_LIFETIME": timedelta(minutes=60),
	"SLIDING_TOKEN_REFRESH_LIFETIME": timedelta(days=1),

	# Сериализаторы
	"TOKEN_OBTAIN_SERIALIZER": "authentication.serializers.TokenObtainPairSerializer",
	"TOKEN_REFRESH_SERIALIZER": "rest_framework_simplejwt.serializers.TokenRefreshSerializer",
}

CSRF_COOKIE_SECURE = False

CSRF_COOKIE_DOMAIN = '127.0.0.1'
SESSION_COOKIE_DOMAIN = '127.0.0.1'

CSRF_TRUSTED_ORIGINS  = [
	"http://127.0.0.1:5137",
]


# myaccount.google.com/lesssecureapps
# Email Settings
# Email for sendgrid
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp-relay.brevo.com' # 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = env('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL = 'gw2raidar@example.com'

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