from rest_framework.views import APIView
from rest_framework.response import Response
from .backend import get_custom_apps
from .backend import get_models_info

django_apps = {
	'django.contrib.admin',
	'django.contrib.auth',
	'django.contrib.contenttypes',
	'django.contrib.sessions',
	'django.contrib.messages',
	'django.contrib.staticfiles',
	'django.contrib.sites',
	'allauth',
	'allauth.account',
	'allauth.socialaccount',
	'corsheaders',
	'rest_framework',
	'djoser',
	'rest_auth',
	'django_filters',
	'adminpanel'
}


class AppListView(APIView):
	def get(self, request):
		app_list = get_custom_apps(django_apps)
		return Response(app_list)


class AppModelsView(APIView):
	def get(self, request):
		app_dict = get_custom_apps(django_apps)
		app_list = list([item['name'] for item in app_dict])
		models_info = get_models_info(app_list)
		# Скрытие внутренностей моделей
		model_structure = {}
		for app, models in models_info.items():
			model_structure[app] = list(models.keys())
		return Response(model_structure)
