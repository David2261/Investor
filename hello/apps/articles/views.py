import datetime
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.db.models import Count, F, Value
from django.db.models import Q
from django.views import View
from django.views.generic import TemplateView
from django.views.generic.list import ListView

from .forms import UserCreationForm
from .models import Category, Articles


class ArticlesList(ListView):
	model = Articles


class HomePage(View):

	def get(self, request, *args, **kwargs):
		# <View logic>
		topics = Category.objects.all()
		articles = Articles.objects.exclude(
			time_create__gt=datetime.date(2022, 10, 3))[0:5]
		context = {'topics': topics, 'articles': articles}
		return render(request, "articles/home.html", context)

	# Какие данные будут передаваться
	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		context['today'] = date.today()
		return context


class BlogPage(View):

	def get(self, request, *args, **kwargs):
		q = request.GET.get('q') if request.get('q') != None else ''
		articles = Articles.objects.filter(
			Q(category__name__icontains=q) |
			Q(title__icontains=q) |
			Q(descrition__icontains=q)
		)
		topics = Category.objects()[0:5]
		context = {'articles': articles, 'topics': topics}
		return render(request, "articles/blog.html", context)

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		context['today'] = date.today()
		return context


class AboutPage(TemplateView):
	template_name = "articles/about.html"

