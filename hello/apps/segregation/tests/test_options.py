import pytest
from segregation.options import check_lang


def test_check_lang_valid_input():
	"""Тестирование корректной транслитерации русского текста."""
	text = "Привет мир"
	expected_output = "Privet mir"
	result = check_lang(text)
	assert result == expected_output


def test_check_lang_invalid_input_type():
	"""Тестирование обработки некорректного типа входных данных."""
	with pytest.raises(ValueError, match="Input must be a string"):
		check_lang(123)
