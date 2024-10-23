# -*- coding: utf-8 -*-
from django import forms
from django.core.exceptions import ValidationError
import csv
import io
from .models import Bonds


class BondsForm(forms.ModelForm):
	csv_file = forms.FileField()
	class Meta:
		model = Bonds
		fields = [
				'title',
				'category',
				'description',
				'price',
				'maturity',
				'is_published',
				'cupon',
				'cupon_percent']


	def clean_csv_file(self):
		csv_file = self.cleaned_data.get('csv_file')

		# Проверка на формат файла
		if not csv_file.name.endswith('.csv'):
			raise ValidationError("File isn't a CSV")

		# Читаем файл и проверяем данные
		try:
			file_data = csv_file.read().decode("utf-8")
			lines = file_data.splitlines()

			# Используем csv.reader для обработки CSV
			csv_reader = csv.reader(lines, delimiter=';')
			header = next(csv_reader)  # Пропускаем заголовок

			# Проверка количества полей в заголовке
			expected_fields = 8  # Изменено на 8, чтобы соответствовать данным
			if len(header) != expected_fields:
				raise ValidationError(f"Invalid header. Expected {expected_fields} fields, got {len(header)}.")

			for line_number, fields in enumerate(csv_reader, start=2):  # Начинаем с 2, чтобы указать номер строки
				# Проверяем количество полей в строке
				if len(fields) != expected_fields:
					raise ValidationError(f"Line {line_number}: Invalid number of fields. Expected {expected_fields}, got {len(fields)}.")

				# Проверяем и преобразуем данные
				try:
					# Обработка полей, которые должны быть числовыми
					float(fields[3].strip().replace(',', '.'))  # price
					float(fields[6].strip().replace(',', '.'))  # cupon
					float(fields[7].strip().replace(',', '.'))  # cupon_percent
				except ValueError:
					raise ValidationError(f"Line {line_number}: Price, Cupon, or Cupon Percent must be valid numbers.")

		except Exception as e:
			raise ValidationError(f"Error reading CSV file: {e}")

		return csv_file
