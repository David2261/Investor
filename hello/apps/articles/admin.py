from django.contrib import admin
from django.core import serializers
from .models import Idea, Motiv, Gallery, Learn, Genre
from django.contrib.contenttypes.models import ContentType

"""class Idea(admin.ModelAdmin):
    list_display = ('title', 'author', 'display_genre')"""

admin.site.register(Genre)
admin.site.register(Learn)
admin.site.register(Gallery)
admin.site.register(Motiv)
admin.site.register(Idea)
