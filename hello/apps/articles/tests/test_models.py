import pytest
from django.urls import reverse
from articles.models import PageHit, Category, Articles, Comment
from django.utils.text import slugify
from segregation.options import check_lang


@pytest.mark.django_db
class TestPageHitModel:
	def test_pagehit_creation(self):
		"""Тест создания модели PageHit и проверка уникальности url"""
		page_hit = PageHit.objects.create(url="example.com", count=10)
		assert page_hit.url == "example.com"
		assert page_hit.count == 10

	def test_pagehit_str_representation(self):
		"""Тест строкового представления модели PageHit"""
		page_hit = PageHit.objects.create(url="example.com", count=10)
		assert str(page_hit) == "10"


@pytest.mark.django_db
class TestCategoryModel:
	def test_category_creation(self):
		"""Тест создания категории и автоматической генерации slug"""
		category_name = "Test Category"
		category = Category.objects.create(name=category_name)
		expected_slug = slugify(check_lang(category_name))
		assert category.slug == expected_slug
		assert category.name == category_name

	def test_category_absolute_url(self):
		"""Тест получения абсолютного URL для Category"""
		category = Category.objects.create(name="Another Category")
		expected_url = reverse(
				"articles:category-detail",
				kwargs={'cat_slug': category.slug})
		assert category.get_absolute_url() == expected_url

	def test_category_str_representation(self):
		"""Тест строкового представления категории"""
		category = Category.objects.create(name="Sample Category")
		assert str(category) == "Sample Category"


@pytest.mark.django_db
class TestArticlesModel:
	def test_article_creation(self, django_user_model):
		"""Тест создания статьи и генерации slug"""
		user = django_user_model.objects.create(username="testuser")
		category = Category.objects.create(name="Sample Category")
		article = Articles.objects.create(
			title="Test Article",
			description="This is a test article.",
			author=user,
			category=category,
			is_published=True
		)
		expected_slug = slugify(check_lang(article.title))
		assert article.slug == expected_slug
		assert article.description == "This is a test article."
		assert article.is_published is True

	def test_article_absolute_url(self, django_user_model):
		"""Тест получения абсолютного URL для статьи"""
		user = django_user_model.objects.create(username="testuser")
		category = Category.objects.create(name="Sample Category")
		article = Articles.objects.create(
			title="Test Article",
			description="This is a test article.",
			author=user,
			category=category
		)
		expected_url = reverse(
				"articles:article-detail",
				kwargs={
						'cat_slug': category.slug,
						'post_slug': article.slug})
		assert article.get_absolute_url() == expected_url

	def test_article_summary_property(self, django_user_model):
		"""Тест свойства summary у статьи"""
		user = django_user_model.objects.create(username="testuser")
		category = Category.objects.create(name="Sample Category")
		article = Articles.objects.create(
			title="Test Article",
			description="A" * 200,
			author=user,
			category=category
		)
		assert len(article.summary) == 150


@pytest.mark.django_db
class TestCommentModel:
	def test_comment_creation(self, django_user_model):
		"""Тест создания комментария и генерации slug"""
		user = django_user_model.objects.create(username="testuser")
		category = Category.objects.create(name="Sample Category")
		article = Articles.objects.create(
			title="Sample Article",
			description="This is an article.",
			author=user,
			category=category
		)
		comment = Comment.objects.create(
			title="Comment Title",
			text="This is a comment.",
			author=user,
			post=article
		)
		expected_slug = slugify(check_lang(comment.title))
		assert comment.slug == expected_slug
		assert comment.text == "This is a comment."

	def test_comment_str_representation(self, django_user_model):
		"""Тест строкового представления комментария"""
		user = django_user_model.objects.create(username="testuser")
		category = Category.objects.create(name="Sample Category")
		article = Articles.objects.create(
			title="Sample Article",
			description="This is an article.",
			author=user,
			category=category
		)
		comment = Comment.objects.create(
			title="Comment Title",
			text="Sample comment text.",
			author=user,
			post=article
		)
		assert str(comment) == "Comment Title"
