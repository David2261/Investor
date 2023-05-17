from rest_framework import viewsets, permissions
from django.contrib.auth.models import Group, Permission

from .models import User
from .serializers import UserSerializer
from .serializers import GroupSerializer
from .serializers import LoginSerializer
from .serializers import RegistrationSerializer



class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer


class LoginViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = LoginSerializer