import pytest
from articles.models import Category
from adminpanel.forms import ArticlesCSVForm


@pytest.mark.django_db
class TestArticlesCSVForm:

	@pytest.fixture
	def category(self):
		"""Create a category for the tests."""
		return Category.objects.create(name="Test Category")

	def test_form_invalid_missing_title(self, category):
		"""Test that the form is invalid without a title."""
		form_data = {
			'category': category.id,
			'description': 'This is a test description.',
			'img': None,  # Replace with a valid image field if necessary
			'is_published': True
		}
		form = ArticlesCSVForm(data=form_data)
		assert form.is_valid() is False
		assert 'title' in form.errors

	def test_form_invalid_missing_category(self):
		"""Test that the form is invalid without a category."""
		form_data = {
			'title': 'Test Article',
			'description': 'This is a test description.',
			'img': None,  # Replace with a valid image field if necessary
			'is_published': True
		}
		form = ArticlesCSVForm(data=form_data)
		assert form.is_valid() is False
		assert 'category' in form.errors

	def test_form_invalid_description_too_short(self, category):
		"""Test that the form is invalid with a short description."""
		form_data = {
			'title': 'Test Article',
			'category': category.id,
			'description': '',  # Empty description
			'img': None,  # Replace with a valid image field if necessary
			'is_published': True
		}
		form = ArticlesCSVForm(data=form_data)
		assert form.is_valid() is False
		assert 'description' in form.errors
