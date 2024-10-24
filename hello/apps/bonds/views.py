import csv
from django.contrib import messages
from django.http import HttpResponse
from django.views import View
from django.views.generic.edit import CreateView
from rest_framework.generics import RetrieveAPIView
from rest_framework.generics import ListAPIView
from rest_framework import permissions

from segregation.decorators import counted  # type: ignore
from .models import Bonds
from .serializers import (
	BondDetailSerializer,
	BondsSerializer
)
from .forms import BondsForm


class BondsList(ListAPIView):
	queryset = Bonds.objects.filter(is_published=True)
	serializer_class = BondsSerializer
	permissions_classes = permissions.AllowAny


@counted
class BondDetail(RetrieveAPIView):
	permission_classes = [permissions.IsAuthenticated]
	queryset = Bonds.objects.filter(is_published=True)
	serializer_class = BondDetailSerializer
	lookup_field = 'slug'
	lookup_url_kwarg = 'bond_slug'


class GenerateCSV(View):
	def get(self, request, *args, **kwargs):
		response = HttpResponse(content_type='text/csv')
		response['Content-Disposition'] = 'attachment; filename="bonds.csv"'

		bonds = Bonds.objects.all()
		writer = csv.writer(response, delimiter=';')
		writer.writerow([
			"id",
			"title",
			"category",
			"description",
			"price",
			"maturity",
			"is_published",
			"cupon",
			"cupon_percent"])
		for bond in bonds:
			writer.writerow([
				bond.id,
				bond.title,
				bond.category,
				bond.description,
				bond.price,
				bond.maturity,
				bond.is_published,
				bond.cupon,
				bond.cupon_percent])

		return response


class UploadCSV(CreateView):
	model = Bonds
	form_class = BondsForm
	template_name = "options/upload_bond.html"

	def form_valid(self, form):
		try:
			form.cleaned_data['csv_file']
			# Логика обработки CSV
			return super().form_valid(form)
		except Exception as e:
			messages.error(self.request, f"Error uploading file: {str(e)}")
