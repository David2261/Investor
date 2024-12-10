from django.urls import path

from .views import (
	AppListView,
	AppModelsView,
	AppAdminMainArticlesAPI,
	AppAdminMainBondsAPI,
	AppAdminArticlesAPI,
	AppAdminBondsAPI,
	AppAdminCategoriesAPI,
	AppAdminAllUsersAPI)


app_name = 'adminpanel'
urlpatterns = [
	path('apps/', AppListView.as_view(), name='app-list'),
	path('apps/models/', AppModelsView.as_view(), name='model-list'),
	path(
		'apps/main/articles/',
		AppAdminMainArticlesAPI.as_view(),
		name='articles-list'),
	path(
		'apps/main/bonds/',
		AppAdminMainBondsAPI.as_view(),
		name='bonds-list'),
	path(
		'apps/main/articles/all/',
		AppAdminArticlesAPI.as_view(),
		name='articles-list-all'),
	path(
		'apps/main/bonds/all/',
		AppAdminBondsAPI.as_view(),
		name='bonds-list-all'),
	path(
		'apps/main/category/all/',
		AppAdminCategoriesAPI.as_view(),
		name='categories-list-all'),
	path(
		'apps/main/user/all/',
		AppAdminAllUsersAPI.as_view(),
		name='users-list-all'),
]
