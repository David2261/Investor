from django.urls import path

from .views import (
	AppListView,
	AppModelsView)


app_name = 'adminpanel'
urlpatterns = [
	path('apps/', AppListView.as_view(), name='app-list'),
	path('apps/models/', AppModelsView.as_view(), name='model-list'),
]
