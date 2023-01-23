from datetime import date, datetime
import logging
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.db.models import Count, F, Value
from django.db.models import Q
from django.urls import reverse_lazy
from django.views import View
from django.views.generic import TemplateView
from django.views.generic.list import ListView
from django.views.generic.edit import FormView
from django.conf import settings
from django.contrib.auth.decorators import login_required

# from .forms import RegisterForm
from .models import Category, Articles, Ip

logging.config.dictConfig(settings.LOGGING)
logger = logging.getLogger("dev")
log_info = logging.getLogger("root")

class ArticlesList(ListView):
	model = Articles


def get_client_ip(request):
	logger.info("Включен 'get_client_ip'")
	x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
	if x_forwarded_for:
		ip = x_forwarded_for.split(',')[0]
	else:
		ip = request.META.get('REMOTE_ADDR')
	return ip


class HomePage(View):

	def get(self, request, *args, **kwargs):
		logger.info("Включен 'get' в 'HomePage'")
		# <View logic>
		topics = Category.objects.all()
		# articles = Articles.objects.exclude(
		# 	time_create__gt=datetime.date(2022, 10, 3))[0:5]
		articles = Articles.objects.all()
		context = {'topics': topics, 'articles': articles}
		return render(request, "articles/home.html", context)

	# Какие данные будут передаваться
	def get_context_data(self, **kwargs):
		logger.info("Включен 'get_context_data' в 'HomePage'")
		context = super().get_context_data(**kwargs)
		context['today'] = date.today()
		return context


class BlogPage(View):

	def get(self, request, *args, **kwargs):
		logger.info("Включен 'get' в 'BlogPage'")
		ip = get_client_ip(request)
		q = request.GET.get('q') if request.get('q') != None else ''
		articles = Articles.objects.filter(
			Q(category__name__icontains=q) |
			Q(title__icontains=q) |
			Q(descrition__icontains=q)
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
