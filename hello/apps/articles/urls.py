from rest_framework import routers
from django.urls import include, path

from .views import HomePage, ArticlesList, CategoriesList, IpList, UserList

# Api
# router = routers.DefaultRouter()

# router.register(r'^ip/$', IpViewSet, 'ip')
# # router.register(r'home/', HomePage, 'home')
# # router.register(r'home/list/', ArticlesList, 'list')
# router.register(r'^category/$', CategoryViewSet, 'category')
# router.register(r'^articles/$', ArticlesViewSet, 'articles')

urlpatterns = [
	path('home/', HomePage.as_view(), name='home'),
	path('ip/list/', IpList.as_view(), name='ip_list'),
	path('articles/list/', ArticlesList.as_view(), name='article_list'),
	path('categories/list/', CategoriesList.as_view(), name='category_list'),
	path('user/list/', UserList.as_view(), name='user_list'),
]

# urlpatterns += router.urls
