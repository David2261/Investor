# from django.contrib.auth.decorators import login_required
from django.urls import path, include
from .import views

app_name = 'frontend'
urlpatterns = [
	path('', views.index),
]