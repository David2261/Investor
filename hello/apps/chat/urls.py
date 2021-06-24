from django.urls import path, include
from . import views


app_name = 'chat'
urlpatterns = [
	path("home/comment/", views.contact, name='comment'),
	path("home/success/", views.SuccessView, name="SuccessView"),
]
