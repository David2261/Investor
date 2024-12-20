from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework.generics import RetrieveAPIView
from rest_framework.generics import ListAPIView
from rest_framework import permissions

from .models import Bonds
from .serializers import (
	BondDetailSerializer,
	BondsSerializer
)


@method_decorator(cache_page(60 * 15), name='dispatch')
class BondsList(ListAPIView):
	queryset = Bonds.objects.filter(is_published=True)
	serializer_class = BondsSerializer
	permissions_classes = [permissions.IsAuthenticated]
	pagination_class = None

	def get_queryset(self):
		queryset = super().get_queryset()
		category = self.request.query_params.get('category', None)
		if category:
			queryset = queryset.filter(category=category)
		return queryset


@method_decorator(cache_page(60 * 15), name='dispatch')
class BondsListOld(ListAPIView):
	queryset = Bonds.objects.filter(is_published=False)
	serializer_class = BondsSerializer
	permissions_classes = [permissions.IsAuthenticated]
	pagination_class = None

	def get_queryset(self):
		queryset = super().get_queryset()
		category = self.request.query_params.get('category', None)
		if category:
			queryset = queryset.filter(category=category)
		return queryset


class BondDetail(RetrieveAPIView):
	permission_classes = [permissions.IsAuthenticated]
	queryset = Bonds.objects.filter(is_published=True)
	serializer_class = BondDetailSerializer
	lookup_field = 'slug'
	lookup_url_kwarg = 'bond_slug'
