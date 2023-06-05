from rest_framework import routers
from django.urls import include, path

from .api import IpViewSet, CategoryViewSet, ArticlesViewSet
from .views import HomePage, ArticlesList

# Api
router = routers.DefaultRouter()

router.register(r'^ip/$', IpViewSet, 'ip')
# router.register(r'home/', HomePage, 'home')
# router.register(r'home/list/', ArticlesList, 'list')
router.register(r'^category/$', CategoryViewSet, 'category')
router.register(r'^articles/$', ArticlesViewSet, 'articles')

urlpatterns = [
	path('home/', HomePage.as_view(), name='home'),
	path('home/list/', ArticlesList.as_view(), name='home_list'),
]

urlpatterns += router.urls
