# from django.contrib.auth.decorators import login_required
from django.urls import path, include
from . import views

app_name = 'articles'
urlpatterns = [
	path('', views.index),
	path('home/', views.home, name='home'),
	path('home/idea/', views.idea, name='idea'),
	path('home/idea/<int:idea_id>/', views.idea_checklist, name = 'idea_checklist'),
	path('home/learn/', views.learn, name='learn'),
	path('home/learn/<int:learn_id>/', views.learn_checklist, name='learn_checklist'),
	path('home/motiv/', views.motiv, name='motiv'),
	path('home/motiv/<int:motiv_id>/', views.motiv_checklist, name='motiv_checklist'),
	path("help/", views.help, name='help'),
	path("setting/", views.setting, name='setting'),
	path("404/", views.pageNotFound, name="404")
]