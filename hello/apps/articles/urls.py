from django.urls import path
from django.contrib.sitemaps.views import sitemap
from .sitemaps import StaticViewSitemap, ArticlesSitemap
from .views import (
	ArticleDetail,
	ArticlesListHome,
	ArticlesList,
	ArticleAPICreator,
	CategoriesList,
	UserList,
	CategoryDetail)

sitemaps = {
    'static': StaticViewSitemap,
    'articles': ArticlesSitemap,
}

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
			'articles/creator/',
			ArticleAPICreator.as_view(),
			name='article-creator'),
	path(
			'articles/creator/<slug:cat_slug>/<slug:post_slug>/',
			ArticleAPICreator.as_view(),
			name='article-creator-detail'),
    path("sitemap.xml", sitemap, {"sitemaps": sitemaps}, name="django.contrib.sitemaps.views.sitemap"),
	# utill paths
	path('user/list/', UserList.as_view(), name='user-list'),
]
