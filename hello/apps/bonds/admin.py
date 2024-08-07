from django.contrib import admin

from .models import Bonds


admin.site.register(Bonds)


class BondsAdmin(admin.ModelAdmin):
	list_display = ("title", "category", "time_create", "is_published")
	ordering = ("title", "time_create", "category", "is_published")
	list_filter = ("title", "time_create", "category", "is_published")
	exclude = ("description", "slug")
	prepopulated_fields = {"slug": ("name", )}
