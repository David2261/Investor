import csv
from django.http import HttpResponse
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


def generate_csv(request):
	response = HttpResponse(content_type='text/csv')
	response['Content-Disposition'] = 'attachment; filename="bonds.csv"'
	bonds = Bonds.objects.all()
	writer = csv.writer(response)
	for bond in bonds:
		writer.writerow([
			bond.id,
			bond.title,
			bond.category,
			bond.description,
			bond.time_create,
			bond.slug,
			bond.time_update,
			bond.price,
			bond.maturity,
			bond.cupon,
			bond.cupon_percent,
			bond.is_published])
	return response
