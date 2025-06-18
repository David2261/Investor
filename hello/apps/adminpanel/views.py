from rest_framework.views import APIView
from rest_framework.response import Response
from articles.models import Articles
from articles.models import Category
from bonds.models import Bonds
from authentication.models import User
from authentication.permissions import IsAdminUser
from .backend import get_custom_apps
from .backend import get_models_info
from .serializers.article_serializers import AdminArticleSerializer
from .serializers.bond_serializers import AdminBondSerializer
from .serializers.category_serializers import AdminCategorySerializer
from .serializers.user_serializers import AdminAllUsersSerializer


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
	permission_classes = [IsAdminUser]

	def get(self, request):
		app_list = get_custom_apps(django_apps)
		return Response(app_list)


class AppModelsView(APIView):
	permission_classes = [IsAdminUser]

	def get(self, request):
		app_dict = get_custom_apps(django_apps)
		app_list = list([item['name'] for item in app_dict])
		models_info = get_models_info(app_list)
		# Скрытие внутренностей моделей
		model_structure = {}
		for app, models in models_info.items():
			model_structure[app] = list(models.keys())
		return Response(model_structure)


class AppAdminMainArticlesAPI(APIView):
	permission_classes = [IsAdminUser]

	def get(self, request):
		article = Articles.objects.order_by('-time_update')[:10]
		article_serializer = AdminArticleSerializer(article, many=True)
		return Response(article_serializer.data)


class AppAdminMainBondsAPI(APIView):
	permission_classes = [IsAdminUser]

	def get(self, request):
		bond = Bonds.objects.order_by('-time_update')[:10]
		bond_serializer = AdminBondSerializer(bond, many=True)
		return Response(bond_serializer.data)


class AppAdminArticlesAPI(APIView):
	permission_classes = [IsAdminUser]

	def get(self, request):
		title = request.query_params.get('title', None)
		author = request.query_params.get('author', None)
		is_published = request.query_params.get('is_published', None)
		category = request.query_params.get('category', None)
		time_update = request.query_params.get('time_update', None)

		articles = Articles.objects.all()

		if title:
			articles = articles.filter(title__icontains=title)
		if author:
			articles = articles.filter(author__username__icontains=author)
		if is_published is not None:
			articles = articles.filter(is_published=is_published.lower() == 'true')
		if category:
			articles = articles.filter(category__name__icontains=category)
		if time_update:
			articles = articles.filter(time_update__date=time_update)

		articles = articles.order_by('-time_update')

		article_serializer = AdminArticleSerializer(articles, many=True)
		return Response(article_serializer.data)


class AppAdminBondsAPI(APIView):
	permission_classes = [IsAdminUser]

	def get(self, request):
		bond = Bonds.objects.all()

		title = request.query_params.get('title', None)
		is_published = request.query_params.get('is_published', None)
		maturity = request.query_params.get('maturity', None)
		cupon_percent = request.query_params.get('cupon_percent', None)
		category = request.query_params.get('category', None)

		if title:
			bond = bond.filter(title__icontains=title)
		if is_published is not None:
			bond = bond.filter(is_published=is_published.lower() == 'true')
		if maturity:
			bond = bond.filter(maturity=maturity)
		if cupon_percent:
			bond = bond.filter(cupon_percent=cupon_percent)
		if category:
			bond = bond.filter(category=category)

		bond = bond.order_by('-time_update')
		bond_serializer = AdminBondSerializer(bond, many=True)
		return Response(bond_serializer.data)


class AppAdminCategoriesAPI(APIView):
	permission_classes = [IsAdminUser]

	def get(self, request):
		category = Category.objects.all()
		category_serializer = AdminCategorySerializer(category, many=True)
		return Response(category_serializer.data)


class AppAdminAllUsersAPI(APIView):
	permission_classes = [IsAdminUser]

	def get(self, request):
		user = User.objects.all()
		user_serializer = AdminAllUsersSerializer(user, many=True)
		return Response(user_serializer.data)
