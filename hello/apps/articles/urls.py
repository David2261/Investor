from rest_framework import routers
from .api import IpViewSet, CategoryViewSet, ArticlesViewSet
from django.urls import path
from .views import HomePage, BlogPage, AboutPage, ProfilePage

# https://webdevblog.ru/sozdanie-django-api-ispolzuya-django-rest-framework-apiview/

# Api
router = routers.DefaultRouter()
router.register('api/ip', IpViewSet, 'ip')
# router.register('api/user', UserViewSet, 'user')
router.register('api/category', CategoryViewSet, 'category')
router.register('api/articles', ArticlesViewSet, 'articles')

# app_name = 'articles'
# urlpatterns = [
#     # path('', views.index, name="main-view" ),
#     path('', HomePage.as_view(), name="home_page"),
#     path('articles/', BlogPage.as_view(), name='articles'),
#     path('about/', AboutPage.as_view(), name="about_page"),
#     path('profile/', ProfilePage.as_view(), name="profile"),
#     path('register/', RegisterPage.as_view(), name="register"),
# ]
urlpatterns = router.urls