from rest_framework import serializers
from apps.sales.models import Product
from apps.rentals.models import RentalProduct
from .models import Order, SaleOrderItem, RentalOrderItem
from apps.sales.serializers import ProductSerializer
from apps.rentals.serializers import RentalProductSerializer


class SaleOrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), source='product')

    class Meta:
        model = SaleOrderItem
        fields = ['product', 'product_id', 'quantity']


class RentalOrderItemSerializer(serializers.ModelSerializer):
    rental_product = RentalProductSerializer(read_only=True)
    rental_product_id = serializers.PrimaryKeyRelatedField(queryset=RentalProduct.objects.all(), source='rental_product')

    class Meta:
        model = RentalOrderItem
        fields = ['rental_product', 'rental_product_id', 'quantity', 'start_date', 'end_date', 'days']


class OrderSerializer(serializers.ModelSerializer):
    sale_items = SaleOrderItemSerializer(many=True, read_only=True)
    rental_items = RentalOrderItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = [
            'id', 'order_type', 'delivery_type', 'delivery_fee',
            'total_price', 'status', 'name', 'email', 'phone',
            'address', 'paystack_ref', 'sale_items', 'rental_items',
            'created_at'
        ]

    def get_total_price(self, obj):
        return obj.calculate_total()