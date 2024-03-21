import csv
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.shortcuts import render
from django.contrib import messages
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


def upload_csv(request):
	data = {}
	if "GET" == request.method:
		return render(request, "options/upload.html", data)

	try:
		csv_file = request.FILES["csv_file"]
		if not csv_file.name.endswith('.csv'):
			messages.error(request, "File isn't a CSV")
			return HttpResponseRedirect(reverse("bonds:upload_csv"))
		if csv_file.multiple_chunks():
			messages.error(
				request,
				"Uploaded file is too big (%.2f MB). " % (csv_file.size / (1000 * 1000),))
			return HttpResponseRedirect(reverse("bonds:upload_csv"))

		file_data = csv_file.read().decode("utf-8")

		lines = file_data.split("\n")

		for line in lines:
			fields = line.split(",")

			try:
				bond = Bonds(
					id=fields[0],
					title=fields[1],
					category=fields[2],
					description=fields[3],
					price=fields[5],
					maturity=fields[6],
					is_published=fields[7],
					cupon=fields[6],
					cupon_percent=fields[7],)
				bond.save()

			except Exception as e:
				messages.error(request, "Unable to upload file. " + repr(e))
				pass
	except Exception as e:
		messages.error(request, "Unable to upload file. " + repr(e))

	return HttpResponseRedirect(reverse("bonds:upload_csv"))
