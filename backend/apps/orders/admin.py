# backend/apps/orders/admin.py
from django.contrib import admin
from .models import Order, SaleOrderItem, RentalOrderItem

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'order_type', 'name', 'total_price', 'status', 'created_at']
    list_filter = ['order_type', 'status']
    search_fields = ['name', 'email']

@admin.register(SaleOrderItem)
class SaleOrderItemAdmin(admin.ModelAdmin):
    list_display = ['order', 'product', 'quantity']

@admin.register(RentalOrderItem)
class RentalOrderItemAdmin(admin.ModelAdmin):
    list_display = ['order', 'rental_product', 'quantity', 'start_date', 'end_date']