import csv
import json
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser
from articles.models import Articles
from bonds.models import Bonds
from datetime import datetime


def serialize_datetime(obj):
	"""Convert datetime objects to ISO 8601 string format."""
	if isinstance(obj, datetime):
		return obj.isoformat()
	raise TypeError("Type not serializable")


class AppAdminArticlesGenerateCSV(APIView):
	permission_classes = [IsAdminUser]

	def get(self, request, *args, **kwargs):
		response = HttpResponse(content_type='text/csv')
		response['Content-Disposition'] = 'attachment; filename="articles.csv"'

		try:
			articles = Articles.objects.values_list(
				'id',
				'title',
				'category__name',
				'description',
				'img',
				'is_published')
			writer = csv.writer(response, delimiter=';')
			writer.writerow([
				"id",
				"title",
				"category",
				"description",
				"img",
				"is_published"])
			writer.writerows(articles)
		except Exception as e:
			return Response(
				{"error": f"Error generating CSV: {str(e)}"},
				status=status.HTTP_500_INTERNAL_SERVER_ERROR)

		return response


class AppAdminArticlesGenerateJSON(APIView):
	permission_classes = [IsAdminUser]

	def get(self, request, *args, **kwargs):
		try:
			articles = Articles.objects.values(
				'id',
				'title',
				'category__name',
				'description',
				'img',
				'is_published')

			articles_list = list(articles)
			json_data = json.dumps(
				articles_list,
				default=serialize_datetime,
				ensure_ascii=False)

			response = HttpResponse(
				json_data,
				content_type='application/json; charset=utf-8'
			)
			response['Content-Disposition'] = 'attachment; filename="articles.json"'
		except Exception as e:
			return Response(
				{"error": f"Error generating JSON: {str(e)}"},
				status=status.HTTP_500_INTERNAL_SERVER_ERROR)

		return response


class AppAdminBondsGenerateCSV(APIView):
	permission_classes = [IsAdminUser]

	def get(self, request, *args, **kwargs):
		response = HttpResponse(content_type='text/csv')
		response['Content-Disposition'] = 'attachment; filename="bonds.csv"'

		try:
			bonds = Bonds.objects.values_list(
				'id', 'title', 'category', 'description', 'price',
				'maturity', 'is_published', 'cupon', 'cupon_percent')
			writer = csv.writer(response, delimiter=';')
			writer.writerow([
				"id", "title", "category", "description", "price",
				"maturity", "is_published", "cupon", "cupon_percent"])
			writer.writerows(bonds)
		except Exception as e:
			return Response(
				{"error": f"Error generating CSV: {str(e)}"},
				status=status.HTTP_500_INTERNAL_SERVER_ERROR)

		return response


class AppAdminBondsGenerateJSON(APIView):
	permission_classes = [IsAdminUser]

	def get(self, request, *args, **kwargs):
		try:
			bonds = Bonds.objects.values(
				'id', 'title', 'category', 'description', 'price',
				'maturity', 'is_published', 'cupon', 'cupon_percent')

			bonds_list = list(bonds)
			json_data = json.dumps(
				bonds_list,
				default=serialize_datetime,
				ensure_ascii=False)

			response = HttpResponse(
				json_data,
				content_type='application/json; charset=utf-8')
			response['Content-Disposition'] = 'attachment; filename="bonds.json"'
		except Exception as e:
			return Response(
				{"error": f"Error generating JSON: {str(e)}"},
				status=status.HTTP_500_INTERNAL_SERVER_ERROR)

		return response
