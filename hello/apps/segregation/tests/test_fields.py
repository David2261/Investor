import pytest
import io
from PIL import Image
from django.core.files.base import ContentFile
from django.db.models.fields.files import ImageFieldFile
from unittest.mock import MagicMock, patch

from segregation.fields import WEBPFieldFile


class TestWEBPFieldFile:
	"""Тест-класс для проверки WEBPFieldFile в формате CBV."""

	@pytest.fixture(autouse=True)
	def setup(self):
		"""Создаёт тестовое изображение и объект WEBPFieldFile перед тестами."""
		self.image_bytes = io.BytesIO()
		image = Image.new("RGB", (100, 100), color="red")
		image.save(self.image_bytes, format="PNG")
		self.image_bytes.seek(0)

		self.mock_instance = MagicMock()
		self.mock_field = MagicMock()
		self.mock_field.storage = MagicMock()
		self.mock_field.attname = "test_image"
		self.webp_field_file = WEBPFieldFile(
			instance=self.mock_instance,
			field=self.mock_field,
			name="test.png")

	def test_save_converts_to_webp(self):
		"""Проверяем, что изображение сохраняется в формате WEBP."""
		content = ContentFile(self.image_bytes.getvalue(), name="test.png")

		with patch.object(
					Image,
					"open",
					return_value=Image.open(self.image_bytes)
				) as mock_open, patch.object(
					Image.Image, "save"
				) as mock_save:

			self.webp_field_file.save("test.png", content)

			mock_open.assert_called_once()

			mock_save.assert_called_once()
			assert mock_save.call_args[1]["format"] == "WEBP"

	def test_save_calls_super_save(self):
		"""Проверяем, что метод `super().save` вызывается с новым контентом."""
		content = ContentFile(self.image_bytes.getvalue(), name="test.png")

		with patch.object(ImageFieldFile, "save") as mock_super_save:
			self.webp_field_file.save("test.png", content)

			mock_super_save.assert_called_once()

			assert mock_super_save.call_args[0][0] == "test.png"
