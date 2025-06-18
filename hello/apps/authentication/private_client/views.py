import os
import json
from datetime import datetime
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status


class ClientMetricsView(APIView):
	permission_classes = [permissions.AllowAny]

	def post(self, request, *args, **kwargs):
		try:
			cookie_data = {
				"userId": request.COOKIES.get("userId"),
				"visitTime": request.COOKIES.get("visitTime"),
				"ipAddress": request.COOKIES.get("ipAddress"),
				"userAgent": request.COOKIES.get("userAgent"),
				"timeZone": request.COOKIES.get("timeZone"),
				"deviceInfo": request.COOKIES.get("deviceInfo"),
				"connectionInfo": request.COOKIES.get("connectionInfo"),
			}

			if not cookie_data["userId"] or not cookie_data["visitTime"]:
				raise ValueError("Required cookies are missing")

			try:
				if cookie_data["deviceInfo"]:
					cookie_data["deviceInfo"] = json.loads(cookie_data["deviceInfo"])
				if cookie_data["connectionInfo"]:
					cookie_data["connectionInfo"] = json.loads(cookie_data["connectionInfo"])
			except json.JSONDecodeError as e:
				raise ValueError(f"Invalid JSON in cookies: {e}")

			log_entry = {
				**cookie_data,
				"logTime": datetime.now().isoformat(),
			}

			log_dir = os.path.join(settings.BASE_DIR, "__logs__")
			os.makedirs(log_dir, exist_ok=True)
			log_file = os.path.join(log_dir, "user.log")

			with open(log_file, "a", encoding="utf-8") as f:
				f.write(json.dumps(log_entry, ensure_ascii=False) + "\n")

			return Response(status=status.HTTP_204_NO_CONTENT)

		except Exception as e:
			error_log = {
				"error": str(e),
				"timestamp": datetime.now().isoformat(),
				"receivedCookies": dict(request.COOKIES),
			}
			with open(os.path.join(log_dir, "error.log"), "a") as f:
				f.write(json.dumps(error_log) + "\n")
			return Response(status=status.HTTP_204_NO_CONTENT)
