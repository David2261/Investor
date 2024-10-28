import tempfile
import pytest
from django.core.files.uploadedfile import SimpleUploadedFile
from ..models import Category
from ..forms import ArticlesCSVForm


@pytest.mark.django_db
class TestArticlesCSVForm:

	@pytest.fixture
	def category(self):
		"""Create a category for the tests."""
		return Category.objects.create(name="Test Category")

	@pytest.mark.skip(
			reason="The test skipped cause the system for uploading "
			"data from csv has not been fully developed")
	def test_form_valid(self, category):
		"""Test that the form is valid with valid data."""
		img = SimpleUploadedFile(
				"test_image.webp",
				b"file_content",
				content_type="image/webp")

		with tempfile.NamedTemporaryFile(
				suffix='.csv',
				mode='w+b',
				delete=False) as csvfile:
			csvfile.write(b'title,category,description,img,is_published\n')
			csvfile.write(
					f'Test Article,{category.id},"This is a test '
					'description.",True\n'.encode('utf-8'))
			csvfile.flush()
			csvfile.seek(0)

			form_data = {
				'csv_file': csvfile,
				'img': img,
			}
			csvfile.close()
			form = ArticlesCSVForm(data=form_data)
			if not form.is_valid():
				print(form.errors)
			assert form.is_valid() is True

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
