import csv
from django.contrib import messages
from django.http import HttpResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.db import transaction
from django.views.generic.edit import CreateView
from rest_framework.generics import RetrieveAPIView
from rest_framework.generics import ListAPIView
from rest_framework import permissions

from authentication.permissions import IsAdminUser
from .models import Bonds
from .serializers import (
	BondDetailSerializer,
	BondsSerializer
)
from .forms import BondsForm


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


class GenerateCSV(View):
	permission_classes = [IsAdminUser]

	def get(self, request, *args, **kwargs):
		response = HttpResponse(content_type='text/csv')
		response['Content-Disposition'] = 'attachment; filename="bonds.csv"'

		bonds = Bonds.objects.values_list(
			'id', 'title', 'category', 'description', 'price',
			'maturity', 'is_published', 'cupon', 'cupon_percent'
		)
		writer = csv.writer(response, delimiter=';')
		writer.writerow([
			"id", "title", "category", "description", "price",
			"maturity", "is_published", "cupon", "cupon_percent"
		])
		writer.writerows(bonds)

		return response


class UploadCSV(CreateView):
	model = Bonds
	form_class = BondsForm
	template_name = "options/upload_bond.html"
	permission_classes = [IsAdminUser]

	def form_valid(self, form):
		csv_file = form.cleaned_data.get('csv_file')
		if not csv_file or not csv_file.name.endswith('.csv'):
			messages.error(self.request, "Invalid or missing CSV file.")
			return self.form_invalid(form)

		try:
			file_data = csv_file.read().decode("utf-8").splitlines()
			with transaction.atomic():
				for line in csv.reader(file_data, delimiter=';'):
					bond_data = {
						'title': line[1],
						'category': line[2],
						'description': line[3],
						'price': line[4],
						'maturity': line[5],
						'is_published': line[6],
						'cupon': line[7],
						'cupon_percent': line[8],
					}
					Bonds.objects.create(**bond_data)
		except Exception as e:
			messages.error(self.request, f"Error uploading file: {str(e)}")
			transaction.rollback()

		return super().form_valid(form)
