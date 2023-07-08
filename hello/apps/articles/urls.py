# from rest_framework import routers
from django.urls import path

from .views import (
	ArticleDetail,
	ArticlesList,
	CategoriesList,
	IpList,
	UserList)

# Api
# router = routers.DefaultRouter()

# router.register(r'^ip/$', IpViewSet, 'ip')
# # router.register(r'home/', HomePage, 'home')
# # router.register(r'home/list/', ArticlesList, 'list')
# router.register(r'^category/$', CategoryViewSet, 'category')
# router.register(r'^articles/$', ArticlesViewSet, 'articles')

app_name = 'articles'
urlpatterns = [
	path('ip/list/', IpList.as_view(), name='ip_list'),
	path('articles/list/', ArticlesList.as_view(), name='articles_list'),
	path(
			'articles/<slug:post_slug>/',
			ArticleDetail.as_view(),
			name='article_detail'),
	path('categories/list/', CategoriesList.as_view(), name='category_list'),
	path('user/list/', UserList.as_view(), name='user_list'),
]

# urlpatterns += router.urls
