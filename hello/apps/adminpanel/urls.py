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
from .generators import (
	AppAdminArticlesGenerateCSV,
	AppAdminArticlesGenerateJSON,
	AppAdminBondsGenerateCSV,
	AppAdminBondsGenerateJSON)
from .uploads import (
	AppAdminArticlesUploadJSON,
	AppAdminArticlesUploadCSV,
	AppAdminBondsUploadCSV,
	AppAdminBondsUploadJSON)


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
	path(
		'apps/main/articles/upload/json/',
		AppAdminArticlesUploadJSON.as_view(),
		name='articles-upload-json'),
	path(
		'apps/main/articles/upload/csv/',
		AppAdminArticlesUploadCSV.as_view(),
		name='articles-upload-csv'),
	path(
		'apps/main/articles/generate/csv/',
		AppAdminArticlesGenerateCSV.as_view(),
		name='articles-generate-csv'),
	path(
		'apps/main/articles/generate/json/',
		AppAdminArticlesGenerateJSON.as_view(),
		name='articles-generate-json'),
	path(
		'apps/main/bonds/generate/csv/',
		AppAdminBondsGenerateCSV.as_view(),
		name='bonds-generate-csv'),
	path(
		'apps/main/bonds/generate/json/',
		AppAdminBondsGenerateJSON.as_view(),
		name='bonds-generate-json'),
	path(
		'apps/main/bonds/upload/csv/',
		AppAdminBondsUploadCSV.as_view(),
		name='bonds-upload-csv'),
	path(
		'apps/main/bonds/upload/json/',
		AppAdminBondsUploadJSON.as_view(),
		name='bonds-upload-json'),
]
