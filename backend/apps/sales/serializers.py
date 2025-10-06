# backend/apps/sales/serializers.py
from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'brand', 'model', 'price', 'lumens', 'resolution', 'hdmi', 'vga', 'stock', 'image', 'description', 'is_available']
