from django.urls import path

from .views import (
	ArticleDetail,
	ArticlesListHome,
	ArticlesList,
	ArticleAPICreator,
	CategoriesList,
	UserList,
	CategoryDetail,
	GenerateCSV,
	GenerateJSON,
	UploadCSV,
	UploadJSON)


app_name = 'articles'
urlpatterns = [
	path('articles/all/', ArticlesList.as_view(), name='articles-list'),
	path(
			'articles/<slug:cat_slug>/<slug:post_slug>/',
			ArticleDetail.as_view(),
			name='article-detail'),
	path('category/all/', CategoriesList.as_view(), name='category-list'),
	path(
			'category/<slug:cat_slug>/',
			CategoryDetail.as_view(),
			name='category-detail'),
	path(
			'articles/home/all',
			ArticlesListHome.as_view(),
			name='articles-home-list'),
	path(
			'articles/creator/<slug:cat_slug>/<slug:post_slug>/',
			ArticleAPICreator.as_view(),
			name='article-creator'),
	# utill paths
	path('user/list/', UserList.as_view(), name='user-list'),
	path('generate/csv/', GenerateCSV.as_view(), name='db-list'),
	path('generate-json/', GenerateJSON.as_view(), name='generate_json'),
	path('upload_csv/', UploadCSV.as_view(), name='upload_csv'),
	path('upload-json/', UploadJSON.as_view(), name='upload_json'),
]
