from django.contrib import admin
from django.contrib.admin import SimpleListFilter
from .models import Bonds

class PriceFilter(SimpleListFilter):
	title = 'Цена'
	parameter_name = 'price'

	def lookups(self, request, model_admin):
		return [
			('low', 'Менее 1000'),
			('medium', '1000-5000'),
			('high', 'Более 5000'),
		]

	def queryset(self, request, queryset):
		if self.value() == 'low':
			return queryset.filter(price__lt=1000)
		elif self.value() == 'medium':
			return queryset.filter(price__gte=1000, price__lte=5000)
		elif self.value() == 'high':
			return queryset.filter(price__gt=5000)
		return queryset


class CuponPercentFilter(SimpleListFilter):
	title = 'Купон (в %)'
	parameter_name = 'cupon_percent'

	def lookups(self, request, model_admin):
		return [
			('low', 'Менее 5%'),
			('medium', '5%-10%'),
			('high', 'Более 10%'),
		]

	def queryset(self, request, queryset):
		if self.value() == 'low':
			return queryset.filter(cupon_percent__lt=5)
		elif self.value() == 'medium':
			return queryset.filter(cupon_percent__gte=5, cupon_percent__lte=10)
		elif self.value() == 'high':
			return queryset.filter(cupon_percent__gt=10)
		return queryset


@admin.register(Bonds)
class BondsAdmin(admin.ModelAdmin):
	list_filter = (
		'category',
		'is_published',
		'time_update',
		'maturity',
		PriceFilter,
		CuponPercentFilter,
	)
