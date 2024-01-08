from rest_framework import viewsets, permissions
from django.contrib.auth.models import Group

from .models import User
from .serializers import UserSerializer
from .serializers import GroupSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = GroupSerializer
