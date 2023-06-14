from django.urls import re_path, include
from rest_framework.routers import DefaultRouter

from .views import RegistrationAPIView
from .views import LoginAPIView
from .views import UserViewSet
from .views import GroupViewSet


router = DefaultRouter()
router.register(r'users', UserViewSet, 'users')
router.register(r'groups', GroupViewSet, 'groups')

app_name = 'authentication'
urlpatterns = [
    re_path('', include(router.urls)),
    re_path(
        r'^registration/?$',
        RegistrationAPIView.as_view(),
        name='user_registration'),
    re_path(r'^login/?$', LoginAPIView.as_view(), name='user_login'),
]
