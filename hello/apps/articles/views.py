import logging
# from django.db.models import Q
from django.conf import settings
# DRF - API
# from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions

# from .forms import RegisterForm
from authentication.models import User
from .models import Category, Articles, Ip
from .serializers import (
	IpSerializer,
	CategorySerializer,
	ArticlesSerializer,
	UserSerializer,
	ArticleDetailSerializer
)

logging.config.dictConfig(settings.LOGGING)
logger = logging.getLogger("dev")
log_info = logging.getLogger("root")


# https://dev.to/earthcomfy/class-based-views-in-drf-are-powerful-19dg
# https://www.cdrf.co/3.13/rest_framework.views/APIView.html
# https://fixmypc.ru/post/realizatsiia-token-autentifikatsii-s-django-rest-framework/


def get_client_ip(request):
	logger.info("Включен 'get_client_ip'")
	x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
	if x_forwarded_for:
		ip = x_forwarded_for.split(',')[0]
	else:
		ip = request.META.get('REMOTE_ADDR')
	return ip


class ArticlesList(ListAPIView):
	permissions_classes = permissions.AllowAny
	queryset = Articles.objects.filter(is_published=True)
	serializer_class = ArticlesSerializer

	def get(self, request, *args, **kwargs):
		""" List with all articles """
		return self.list(
				self.serializer_class.data,
				status=status.HTTP_200_OK)

	def post(self, request, *args, **kwargs):
		data = {
			"title": request.data.get('title'),
			"description": request.data.get('description'),
			"category": request.data.get('category'),
			"img": request.data.get('img'),
			"user": request.user.id
		}
		serializer = ArticlesSerializer(data=data)
		if serializer.is_valid():
			serializer.save()
			return self.create(
					serializer.data,
					status=status.HTTP_201_CREATED)
		return self.create(
				serializer.errors,
				status=status.HTTP_400_BAD_REQUEST)


class ArticleDetail(RetrieveAPIView):
	permissions_classes = permissions.AllowAny
	queryset = Articles.objects.filter(is_published=True)
	serializer_class = ArticleDetailSerializer
	lookup_field = 'slug'
	lookup_url_kwarg = 'post_slug'

	# def get(self, request, post_slug):
	# 	post = self.get_object(post_slug)
	# 	serializer = ArticlesSerializer(post)
	# 	return Response(serializer.data)


class CategoriesList(ListAPIView):
	queryset = Category.objects.all()
	permissions_classes = permissions.AllowAny
	serializer_class = CategorySerializer


class CategoryDetail(ListAPIView):
	permissions_classes = permissions.AllowAny
	serializer_class = ArticlesSerializer
	lookup_field = 'slug'
	lookup_url_kwarg = 'cat_slug'

	def get_queryset(self):
		posts = Articles.objects.filter(
				category__slug=self.kwargs['cat_slug'],
				is_published=True).select_related('category')
		return posts


class IpList(ListAPIView):
	queryset = Ip.objects.all()
	permissions_classes = permissions.AllowAny
	serializer_class = IpSerializer


class UserList(ListAPIView):
	queryset = User.objects.all()
	permissions_classes = [
		permissions.AllowAny
	]
	serializer_class = UserSerializer


# class BlogPage(View):

# 	def get(self, request, *args, **kwargs):
# 		logger.info("Включен 'get' в 'BlogPage'")
# 		ip = get_client_ip(request)
# 		q = request.GET.get('q') if request.get('q') is not None else ''
# 		articles = Articles.objects.filter(
# 			Q(category__name__icontains=q) | Q(
# 				title__icontains=q) | Q(descrition__icontains=q)
# 		)
# 		topics = Category.objects()[0:5]
# 		if Ip.objects.filter(ip=ip).exists():
# 			articles.views.add(Ip.objects.get(ip=ip))
# 		else:
# 			Ip.objects.create(ip=ip)
# 			articles.views.add(Ip.objects.get(ip=ip))
# 		context = {'articles': articles, 'topics': topics}
# 		return render(request, "articles/blog.html", context)

# 	def get_context_data(self, **kwargs):
# 		logger.info("Включен 'get_context_data' в 'HomePage'")
# 		context = super().get_context_data(**kwargs)
# 		context['today'] = date.today()
# 		return context


# class ProfilePage(View):
# 	@login_required
# 	def get(self, request, *args, **kwargs):
# 		logger.info("Включен 'get' в 'ProfilePage'")
# 		return render(request, "user/profile.html")


# class RegisterPage(FormView):
# 	form_class = RegisterForm
# 	template_name = 'registration/register.html'
# 	success_url = reverse_lazy("articles:profile")

# 	def form_valid(self, form):
# 		form.save()
# 		return super().form_valid(form)
