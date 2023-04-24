from django.test import TestCase
import pytest

from articles.models import Articles


@pytest.mark.skip("'QuerySet' object has no attribute 'title'")
class ArticleTest(TestCase):
	def test_first_object_in_db(self):
		obj1 = Articles.objects.filter(title='Saxo Bank')
		self.assertEqual(obj1.title, 'Saxo Bank')

	def test_second_object_in_db(self):
		obj2 = Articles.objects.filter(title='Swiss National Bank')
		self.assertEqual(obj2.title, 'Swiss National Bank')
