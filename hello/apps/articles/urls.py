from django.urls import path

from .views import (
	ArticleDetail,
	ArticlesList,
	CategoriesList,
	UserList,
	CategoryDetail,
	generate_csv,
	upload_csv)


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
	# utill paths
	path('user/list/', UserList.as_view(), name='user-list'),
	path('generate/csv/', generate_csv, name='db-list'),
	path('upload_csv/', upload_csv, name='upload_csv'),
]
