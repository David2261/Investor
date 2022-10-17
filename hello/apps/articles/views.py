from django.contrib.auth import authenticate, login
from django.views import View, TemplateView
from django.shortcuts import render, redirect
from django.db.models import Count, F, Value

from .forms import UserCreationForm



class HomePage(View):

	def get(self, request, *args, **kwargs):
		# <View logic>
		return render(request, "articles/home.html", context)

	# Какие данные будут передаваться
	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		context['today'] = date.today()
	return context



class AboutPage(TemplateView):
	template_name = "articles/about.html"

