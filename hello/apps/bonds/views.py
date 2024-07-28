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

	def post(self, request, *args, **kwargs):
		if "csv_file" not in request.FILES:
			messages.error(request, "No file was uploaded")
			return super().post(request, *args, **kwargs)

		csv_file = request.FILES["csv_file"]
		if not csv_file.name.endswith('.csv'):
			messages.error(request, "File isn't a CSV")
			return super().post(request, *args, **kwargs)

		if csv_file.multiple_chunks():
			messages.error(
				request,
				"Uploaded file is too big (%.2f MB)." % (csv_file.size / (1000 * 1000),))
			return super().post(request, *args, **kwargs)

		file_data = csv_file.read().decode("utf-8")
		lines = file_data.split("\n")

		for line in lines:
			fields = line.split(";")
			if len(fields) != 9:  # Assuming 9 fields in the CSV file
				messages.error(
					request,
					"Unable to upload file. Invalid number of fields.")
				continue
			try:
				bond_data = {
					'title': fields[1],
					'category': fields[2],
					'description': fields[3],
					'price': fields[4],
					'maturity': fields[5],
					'is_published': fields[6],
					'cupon': fields[7],
					'cupon_percent': fields[8]
				}
				bond = self.form_class(bond_data)
				bond.save()
			except Exception as e:
				messages.error(request, "Unable to upload file. " + repr(e))
				pass
		return super().post(request, *args, **kwargs)
