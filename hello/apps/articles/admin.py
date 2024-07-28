# -*- coding: utf-8 -*-
from django.contrib import admin
# from django.contrib.auth.admin import UserAdmin
from .models import Articles
from .models import Category


admin.site.site_title = "Investor Site Admin"
admin.site.site_header = "Investor Site Admin"

# admin.site.register(User)
# class UserAdmin(admin.ModelAdmin):
# 	fields = ("name", "sex", "img", "age", "time_create")
# 	exclude = ('password',)
# 	prepopulated_fields = {"slug": ("name", )}

admin.site.register(Category)


class CategoryAdmin(admin.ModelAdmin):
	list_display = ("name",)
	exclude = ("slug",)
	prepopulated_fields = {"slug": ("name", )}


admin.site.register(Articles)


class ArticlesAdmin(admin.ModelAdmin):
	list_display = ("title", "category", "time_create", "is_published")
	ordering = ("title", "time_create", "category", "is_published")
	list_filter = ("title", "time_create", "category", "is_published")
	exclude = ("description", "slug")
	prepopulated_fields = {"slug": ("name", )}
