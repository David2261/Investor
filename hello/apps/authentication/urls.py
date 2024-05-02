from django.urls import path
from rest_framework_simplejwt.views import (
	TokenObtainPairView,
	TokenRefreshView,
	TokenVerifyView,
)

from .views import CurrentUserView
from .views import RegistrationAPIView


app_name = 'authentication'
urlpatterns = [
	path(
			'v1/registration/',
			RegistrationAPIView.as_view(),
			name='user_registration'),
	# Login
	path(
			'v1/token/',
			TokenObtainPairView.as_view(),
			name='token_obtain_pair'),
	path(
			'v1/token/refresh/',
			TokenRefreshView.as_view(),
			name='token_refresh'),
	path('v1/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
	path('v1/user/data/', CurrentUserView.as_view(), name="current-user"),
]
