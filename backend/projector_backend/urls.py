# backend/projector_backend/urls.py

"""
URL configuration for projector_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
"""

import os
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from rest_framework.routers import DefaultRouter

# Import your viewsets
from apps.sales.views import ProductViewSet
from apps.rentals.views import RentalProductViewSet
from apps.orders.views import OrderViewSet

# Router registration
router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'rentals', RentalProductViewSet)
router.register(r'orders', OrderViewSet)

# Simple views
def home(request):
    return JsonResponse({"status": "ok", "service": "projector-backend"})

def health(request):
    return JsonResponse({"status": "healthy"})

# Debug endpoint - only enabled when DEBUG=True or ALLOW_DEBUG_INFO=True
def debug_info(request):
    from django.conf import settings as dj_settings
    return JsonResponse({
        "ALLOWED_HOSTS": list(getattr(dj_settings, "ALLOWED_HOSTS", [])),
        "CSRF_TRUSTED_ORIGINS": list(getattr(dj_settings, "CSRF_TRUSTED_ORIGINS", [])),
        "CORS_ALLOWED_ORIGINS": list(getattr(dj_settings, "CORS_ALLOWED_ORIGINS", [])),
        "REQUEST_HOST": request.get_host(),
        "HTTP_HOST_HEADER": request.META.get("HTTP_HOST"),
    })

# Build urlpatterns
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('health/', health, name='health'),
    path('api/', include(router.urls)),
]

# Conditionally add debug route
ALLOW_DEBUG = os.getenv("ALLOW_DEBUG_INFO", "False").lower() == "true"
if settings.DEBUG or ALLOW_DEBUG:
    urlpatterns += [
        path('debug-info/', debug_info, name='debug-info'),
    ]

# Serve media in development / on Render static serving
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)