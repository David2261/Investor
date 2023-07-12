from django.urls import path

from .views import (
	ArticleDetail,
	ArticlesList,
	CategoriesList,
	IpList,
	UserList,
	CategoryDetail)

app_name = 'articles'
urlpatterns = [
	path('ip/list/', IpList.as_view(), name='ip-list'),
	path('posts/all/', ArticlesList.as_view(), name='articles-list'),
	path(
			'article/<slug:post_slug>/',
			ArticleDetail.as_view(),
			name='article-detail'),
	path('category/all/', CategoriesList.as_view(), name='category-list'),
	path(
			'category/<slug:cat_slug>/',
			CategoryDetail.as_view(),
			name='category-detail'),
	path('user/list/', UserList.as_view(), name='user-list'),
]
