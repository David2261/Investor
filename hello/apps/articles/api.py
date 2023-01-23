from .models import Ip, Category, Articles
from rest_framework import viewsets, permissions
from .serializers import IpSerializer, CategorySerializer, ArticlesSerializer


class IpViewSet(viewsets.ModelViewSet):
    queryset = Ip.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = IpSerializer


# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     permissions_classes = [
#         permissions.AllowAny
#     ]
#     serializer_class = UserSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = CategorySerializer


class ArticlesViewSet(viewsets.ModelViewSet):
    queryset = Articles.objects.all()
    permissions_classes = [
        permissions.AllowAny
    ]
    serializer_class = ArticlesSerializer
