from datetime import date
import logging
from django.shortcuts import render
from django.db.models import Q
from django.conf import settings
from django.views.generic import ListView
from django.views import View
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
# DRF - API
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions, viewsets

# from .forms import RegisterForm
from .models import Category, Articles, Ip
from .serializers import CategorySerializer, ArticlesSerializer

logging.config.dictConfig(settings.LOGGING)
logger = logging.getLogger("dev")
log_info = logging.getLogger("root")


# https://dev.to/earthcomfy/class-based-views-in-drf-are-powerful-19dg
# https://www.cdrf.co/3.13/rest_framework.views/APIView.html
# https://fixmypc.ru/post/realizatsiia-token-autentifikatsii-s-django-rest-framework/

class ArticlesList(ListCreateAPIView):
	queryset = Articles.objects.all()
	serializer_class = ArticlesSerializer


def get_client_ip(request):
	logger.info("Включен 'get_client_ip'")
	x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
	if x_forwarded_for:
		ip = x_forwarded_for.split(',')[0]
	else:
		ip = request.META.get('REMOTE_ADDR')
	return ip


class HomePage(ListCreateAPIView):
	queryset = Articles.objects.all()
	serializer_class = ArticlesSerializer
	permission_classes = [permissions.IsAuthenticated]

	def get(self, request, *args, **kwargs):
		logger.info("Включен 'get' в 'HomePage'")
		topics = Category.objects.all()
		articles = Articles.objects.exclude(
			time_create__gt=datetime.date(2022, 10, 3))[0:5]
		articles = Articles.objects.all()
		context = {'topics': topics, 'articles': articles}
		return render(request, "articles/home.html", context)

	# # Какие данные будут передаваться
	# def get_context_data(self, **kwargs):
	# 	logger.info("Включен 'get_context_data' в 'HomePage'")
	# 	context = super().get_context_data(**kwargs)
	# 	context['today'] = date.today()
	# 	return context


class BlogPage(View):

	def get(self, request, *args, **kwargs):
		logger.info("Включен 'get' в 'BlogPage'")
		ip = get_client_ip(request)
		q = request.GET.get('q') if request.get('q') is not None else ''
		articles = Articles.objects.filter(
			Q(category__name__icontains=q) | Q(
				title__icontains=q) | Q(descrition__icontains=q)
		)
		topics = Category.objects()[0:5]
		if Ip.objects.filter(ip=ip).exists():
			articles.views.add(Ip.objects.get(ip=ip))
		else:
			Ip.objects.create(ip=ip)
			articles.views.add(Ip.objects.get(ip=ip))
		context = {'articles': articles, 'topics': topics}
		return render(request, "articles/blog.html", context)

	def get_context_data(self, **kwargs):
		logger.info("Включен 'get_context_data' в 'HomePage'")
		context = super().get_context_data(**kwargs)
		context['today'] = date.today()
		return context


class ProfilePage(View):
	@login_required
	def get(self, request, *args, **kwargs):
		logger.info("Включен 'get' в 'ProfilePage'")
		return render(request, "user/profile.html")


# class RegisterPage(FormView):
# 	form_class = RegisterForm
# 	template_name = 'registration/register.html'
# 	success_url = reverse_lazy("articles:profile")

# 	def form_valid(self, form):
# 		form.save()
# 		return super().form_valid(form)

class AboutPage(TemplateView):
	template_name = "articles/about.html"
