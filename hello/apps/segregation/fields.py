#!/usr/local/bin/python
# -*- coding: utf-8 -*-
import io
from PIL import Image
from django.core.files.base import ContentFile
from django.db import models
from django.db.models.fields.files import ImageFieldFile


class WEBPFieldFile(ImageFieldFile):
	def save(self, name: str, content: ContentFile, save: bool = True) -> None:
		content.file.seek(0)
		image = Image.open(content.file)
		image_bytes = io.BytesIO()
		image.save(fp=image_bytes, format="WEBP")
		image_content_file = ContentFile(content=image_bytes.getvalue())
		super().save(name, image_content_file, save)


class WEBPField(models.ImageField):
	attr_class = WEBPFieldFile

	def __init__(self, *args, **kwargs) -> None:
		super().__init__(*args, **kwargs)
