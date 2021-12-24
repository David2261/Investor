from django.urls import path, include
from . import views


app_name = 'chat'
urlpatterns = [
	path("home/comment/", views.contact, name='comment'),
	path("home/comment/success/", views.success, name="success"),
]
