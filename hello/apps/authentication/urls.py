from django.urls import re_path

from .views import RegistrationAPIView
from .views import LoginAPIView


app_name = 'authentication'
urlpatterns = [
    re_path(
        r'^registration/?$',
        RegistrationAPIView.as_view(),
        name='user_registration'),
    re_path(r'^login/?$', LoginAPIView.as_view(), name='user_login'),
]
