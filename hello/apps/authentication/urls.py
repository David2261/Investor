from django.urls import re_path, include
from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
	TokenObtainPairView,
	TokenRefreshView,
	TokenVerifyView,
)

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
		r'v1/^registration/?$',
		RegistrationAPIView.as_view(),
		name='user_registration'),
	re_path(r'^login/?$', LoginAPIView.as_view(), name='user_login'),
	path(
			'v1/token/',
			TokenObtainPairView.as_view(),
			name='token_obtain_pair'),
	path(
			'v1/token/refresh/',
			TokenRefreshView.as_view(),
			name='token_refresh'),
	path('v1/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
