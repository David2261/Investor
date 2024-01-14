from rest_framework.generics import RetrieveAPIView
from rest_framework.generics import ListAPIView
from rest_framework import permissions
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

from articles.segregation.decorators import counted
from .models import Bonds
from .serializers import (
	BondDetailSerializer,
	BondsSerializer)


class BondsList(ListAPIView):
	queryset = Bonds.objects.filter(is_published=True)
	serializer_class = BondsSerializer
	permissions_classes = permissions.AllowAny


@counted
@method_decorator(login_required, name="dispatch")
class BondDetail(RetrieveAPIView):
	permissions_classes = permissions.IsAuthenticated
	queryset = Bonds.objects.filter(is_published=True)
	serializer_class = BondDetailSerializer
	lookup_field = 'slug'
	lookup_url_kwarg = 'bond_slug'
