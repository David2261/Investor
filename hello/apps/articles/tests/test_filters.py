import pytest
from django.utils import timezone
from ..models import Articles
from ..models import Category
from ..filters import ArticleFilter


@pytest.fixture
def create_articles(db, django_user_model):
	"""Fixture to create sample articles for testing."""
	now = timezone.now()
	category1 = Category.objects.create(name='tech')
	category2 = Category.objects.create(name='health')
	user = django_user_model.objects.create(username="testuser")

	Articles.objects.create(
			title="Tech Article",
			category=category1,
			time_create=now,
			author=user,
			is_published=True,
			popularity=100)
	Articles.objects.create(
			title="Health Article",
			category=category2,
			time_create=now,
			author=user,
			is_published=True,
			popularity=50)
	Articles.objects.create(
			title="Old Tech Article",
			category=category1,
			time_create=now - timezone.timedelta(days=365),
			author=user,
			is_published=True,
			popularity=200)


@pytest.mark.django_db
class TestArticleFilter:
	def test_category_filter(self, create_articles):
		"""Test filtering by category slug."""
		filter_params = {"category": "tech"}
		article_filter = ArticleFilter(
				filter_params,
				queryset=Articles.objects.all())
		filtered_qs = article_filter.qs
		assert filtered_qs.count() == 2
		assert all(
			article.category.slug == "tech"
			for article in filtered_qs)

	def test_time_create_filter(self, create_articles):
		"""Test filtering by creation time range."""
		filter_params = {"category": "tech", "popularity__gte": 100}
		article_filter = ArticleFilter(
				filter_params,
				queryset=Articles.objects.all())
		filtered_qs = article_filter.qs
		assert filtered_qs.count() == 2
		assert all(
			article.category.slug == "tech"
			and article.popularity >= 100 for article in filtered_qs)

	def test_popularity_filter(self, create_articles):
		"""Test filtering by popularity."""
		filter_params = {"popularity__gte": 100}
		article_filter = ArticleFilter(
				filter_params,
				queryset=Articles.objects.all())
		filtered_qs = article_filter.qs
		assert filtered_qs.count() == 2
		assert all(article.popularity >= 100 for article in filtered_qs)

	def test_combined_filters(self, create_articles):
		"""Test combining multiple filters."""
		now = timezone.now()
		filter_params = {
			"category": "tech",
			"popularity__lte": 200,
			"time_create__gte": now - timezone.timedelta(days=365)}
		article_filter = ArticleFilter(
				filter_params,
				queryset=Articles.objects.all())
		filtered_qs = article_filter.qs
		assert filtered_qs.count() == 2
