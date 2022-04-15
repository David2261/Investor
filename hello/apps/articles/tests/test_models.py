from django.test import TestCase
from articles.models import Genre, Idea, IdeaComment, Motiv, \
	MotivComment, Learn, LearnComment





def run_field_parameter_test(
        model, self_,
        field_and_parameter_value: dict,
        parameter_name: str) -> None:

	for instance in model.objects.all():
        # Пример 1: field = "email"; expected_value = 256.
        # Пример 2: field = "email"; expected_value = "Электронная почта".
		for field, expected_value in field_and_parameter_value.items():
			parameter_real_value = getattr(
				instance._meta.get_field(field), parameter_name
			)

			self_.assertEqual(parameter_real_value, expected_value)


class TestVerboseNameMixin:
    """Миксин для проверки verbose_name"""

    def run_verbose_name_test(self, model):
        """Метод, тестирующий verbose_name"""

        run_field_parameter_test(
            model, self, self.field_and_verbose_name, 'verbose_name'
        )


class TestMaxLengthMixin:
    """Миксин для проверки max_length"""

    def run_max_length_test(self, model):
        """Метод, тестирующий max_length"""

        run_field_parameter_test(
            model, self, self.field_and_max_length, 'max_length'
        )

MIXINS_SET = (
    TestVerboseNameMixin, TestMaxLengthMixin,
)


class GenreTests(TestCase, *MIXINS_SET):

	@classmethod 
	def setUpTestData(cls): 
		# ...
		cls.field_and_verbose_name = {
			'name': 'Категория',
		}

		cls.field_and_max_length = {
			'name': 256,
		}

	def test_verbose_name(self):
	#Тест параметра verbose_name

		super().run_verbose_name_test(Genre)


	def test_max_length(self):
	#Тест параметра max_length
		super().run_max_length_test(Genre)