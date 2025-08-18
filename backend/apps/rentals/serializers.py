# backend/apps/rentals/serializers.py
from rest_framework import serializers
from .models import RentalProduct, RentalAvailability

class RentalAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = RentalAvailability
        fields = ['date', 'available_quantity']

class RentalProductSerializer(serializers.ModelSerializer):
    availabilities = RentalAvailabilitySerializer(many=True, read_only=True)

    class Meta:
        model = RentalProduct
        fields = ['id', 'name', 'slug', 'brand', 'model', 'price_per_day', 'lumens', 'resolution', 'hdmi', 'vga', 'total_quantity', 'image', 'description', 'availabilities']