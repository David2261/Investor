from django.test import TestCase

from articles.models import Articles


class ArticleTest(TestCase):
	def test_first_object_in_db(self):
		obj1 = Articles.objects.first()
		assert obj1 == 'Morgan Stanley'
