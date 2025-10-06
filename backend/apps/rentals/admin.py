# backend/apps/rentals/admin.py
from django.contrib import admin
from .models import RentalProduct, RentalAvailability

@admin.register(RentalProduct)
class RentalProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'brand', 'model', 'price_per_day', 'total_quantity']
    list_filter = ['brand']
    search_fields = ['name', 'brand', 'model']
    prepopulated_fields = {'slug': ('name',)}

@admin.register(RentalAvailability)
class RentalAvailabilityAdmin(admin.ModelAdmin):
    list_display = ['rental_product', 'date', 'available_quantity']
    list_filter = ['rental_product', 'date']
