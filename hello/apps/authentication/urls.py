from django.urls import path
from rest_framework_simplejwt.views import (
	TokenObtainPairView,
	TokenRefreshView,
	TokenVerifyView,
)
from .views import PasswordResetRequestView
from .views import PasswordResetConfirmView
from .views import CurrentUserView
from .views import UserDetailView
from .views import UserLoginView
from .views import RegistrationAPIView
from .views import GoogleLoginView
from .views import YandexLoginView
from .views import MicrosoftLoginView


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
	# Login для будущей кастомизации
	path('v1/login/', UserLoginView.as_view(), name='user_login'),
	path(
		'v1/token/refresh/',
		TokenRefreshView.as_view(),
		name='token_refresh'),
	path('password/reset/', PasswordResetRequestView.as_view(), name='password_reset_request'),
	path('password/reset/confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
	path('v1/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
	# Возращает данные о пользователе
	# (т.е. является ли он креатором или админом).
	path('v1/user/data/', CurrentUserView.as_view(), name="current-user"),
	path('user/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
	path('google/login/', GoogleLoginView.as_view(), name='google_login'),
	path('yandex/login/', YandexLoginView.as_view(), name='yandex_login'),
	path(
		'microsoft/login/',
		MicrosoftLoginView.as_view(),
		name='microsoft_login'),
]
