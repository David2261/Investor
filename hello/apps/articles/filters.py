import django_filters
from .models import Articles


class ArticleFilter(django_filters.FilterSet):
	# Сортировка по популярности
	class Meta:
		model = Articles
		fields = {
			'time_create': ['gte', 'lte'],
			'popularity': ['gte', 'lte'],
			'category': ['exact'],
		}
