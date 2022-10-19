from django.contrib import admin
from .models import Category, Articles


admin.site.site_title = "Investor Site Admin"
admin.site.site_header = "Investor Site Admin"


admin.site.register(Category)
class CategoryAdmin(admin.ModelAdmin):
	list_display = ("name",)
	exclude = ("slug",)


admin.site.register(Articles)
class ArticlesAdmin(admin.ModelAdmin):
	list_display = ("title", "category", "time_create", "is_published")
	ordering = ("title", "time_create", "category", "is_published")
	list_filter = ("title", "time_create", "category", "is_published")
	exclude = ("description", "slug")