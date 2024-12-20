import csv
import json
from django.db import transaction
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser
from rest_framework.parsers import MultiPartParser
from rest_framework.parsers import FormParser
from articles.models import Articles
from articles.models import Category
from bonds.models import Bonds


class AppAdminArticlesUploadCSV(APIView):
	permission_classes = [IsAdminUser]
	parser_classes = [MultiPartParser, FormParser]

	def post(self, request, *args, **kwargs):
		csv_file = request.FILES.get("csv_file")
		if not csv_file or not csv_file.name.endswith('.csv'):
			return Response(
				{"error": "Invalid or missing CSV file."},
				status=status.HTTP_400_BAD_REQUEST)

		try:
			file_data = csv_file.read().decode("utf-8").splitlines()
			with transaction.atomic():
				for index, line in enumerate(
					csv.reader(file_data, delimiter=';')):
					if index == 0:
						continue

					article_data = {
						'title': line[1],
						'category': Category.objects.get(name=line[2]),
						'description': line[3],
						'img': line[4],
						'is_published': line[5],
						'author': request.user
					}
					Articles.objects.create(**article_data)
			return Response({
				"success": "CSV file uploaded and articles \
					created successfully."},
				status=status.HTTP_201_CREATED)
		except Exception as e:
			return Response(
				{"error": f"Unable to upload file. {repr(e)}"},
				status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AppAdminArticlesUploadJSON(APIView):
	permission_classes = [IsAdminUser]
	parser_classes = [MultiPartParser, FormParser]

	def post(self, request, *args, **kwargs):
		json_file = request.FILES.get('json_file')
		if not json_file or not json_file.name.endswith('.json'):
			return Response(
				{"error": "Invalid or missing JSON file."},
				status=status.HTTP_400_BAD_REQUEST)

		try:
			file_data = json_file.read().decode("utf-8")
			articles_data = json.loads(file_data)

			# Validate the structure of the JSON data
			if not isinstance(articles_data, list):
				return Response(
					{"error": "JSON data should be a list of articles."},
					status=status.HTTP_400_BAD_REQUEST)

			with transaction.atomic():
				for article in articles_data:
					title = article.get('title')
					category_name = article.get('category__name')
					description = article.get('description')

					if not title or not category_name or not description:
						return Response(
							{"error": "Each article must have a \
							title, category name, and description."},
							status=status.HTTP_400_BAD_REQUEST)

					category, _ = Category.objects.get_or_create(
						name=category_name)

					Articles.objects.create(
						title=title,
						category=category,
						description=description,
						author=request.user)

			return Response({
				"success": "JSON file uploaded and articles \
					created successfully."},
				status=status.HTTP_201_CREATED)

		except json.JSONDecodeError:
			return Response(
				{"error": "Invalid JSON format."},
				status=status.HTTP_400_BAD_REQUEST)
		except Exception as e:
			return Response(
				{"error": f"Unable to upload file. {repr(e)}"},
				status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AppAdminBondsUploadCSV(APIView):
	permission_classes = [IsAdminUser]
	parser_classes = [MultiPartParser, FormParser]

	def post(self, request, *args, **kwargs):
		csv_file = request.FILES.get('csv_file')
		if not csv_file or not csv_file.name.endswith('.csv'):
			return Response(
				{"error": "Invalid or missing CSV file."},
				status=status.HTTP_400_BAD_REQUEST)

		try:
			file_data = csv_file.read().decode("utf-8").splitlines()
			with transaction.atomic():
				for index, line in enumerate(
					csv.reader(file_data, delimiter=';')):

					if index == 0:
						continue

					bond_data = {
						'title': line[1],
						'category': line[2],
						'description': line[3],
						'price': float(line[4]),
						'maturity': line[5],
						'is_published': line[6].lower() in ['true', '1'],
						'cupon': line[7],
						'cupon_percent': line[8],
						'author': request.user,
					}
					Bonds.objects.create(**bond_data)
			return Response({
				"success": "CSV file uploaded and bonds \
					created successfully."},
				status=status.HTTP_201_CREATED)
		except Exception as e:
			return Response(
				{"error": f"Error uploading file: {str(e)}"},
				status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AppAdminBondsUploadJSON(APIView):
	permission_classes = [IsAdminUser]
	parser_classes = [MultiPartParser, FormParser]

	def post(self, request, *args, **kwargs):
		json_file = request.FILES.get('json_file')
		if not json_file or not json_file.name.endswith('.json'):
			return Response(
				{"error": "Invalid or missing JSON file."},
				status=status.HTTP_400_BAD_REQUEST)

		try:
			file_data = json_file.read().decode("utf-8")
			bonds_data = json.loads(file_data)

			with transaction.atomic():
				for bond in bonds_data:
					bond_data = {
						'title': bond.get('title'),
						'category': bond.get('category'),
						'description': bond.get('description'),
						'price': bond.get('price'),
						'maturity': bond.get('maturity'),
						'is_published': bond.get('is_published'),
						'cupon': bond.get('cupon'),
						'cupon_percent': bond.get('cupon_percent'),
						'author': request.user,
					}
					Bonds.objects.create(**bond_data)
			return Response({
					"success": "JSON file uploaded and \
						bonds created successfully."},
				status=status.HTTP_201_CREATED)
		except json.JSONDecodeError:
			return Response(
				{"error": "Invalid JSON format."},
				status=status.HTTP_400_BAD_REQUEST)
		except Exception as e:
			return Response(
				{"error": f"Error uploading file: {str(e)}"},
				status=status.HTTP_500_INTERNAL_SERVER_ERROR)
