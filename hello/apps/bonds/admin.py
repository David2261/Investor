from django.contrib import admin

from .models import Bonds, Category


admin.site.register(Category)
class CategoryAdmin(admin.ModelAdmin):
	list_display = ("name", "time_create")
	exclude = ("slug")


admin.site.register(Bonds)

class BondsAdmin(admin.ModelAdmin):
	list_display = ("title", "category", "time_create", "is_published")
	ordering = ("title", "time_create", "category", "is_published")
	list_filter = ("title", "time_create", "category", "is_published")
	exclude = ("description", "slug")
	prepopulated_fields = {"slug": ("name", )}
