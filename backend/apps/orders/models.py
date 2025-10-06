from django.db import models
from apps.common.models import TimeStampedModel
from apps.sales.models import Product
from apps.rentals.models import RentalProduct
from django.contrib.auth.models import User

class Order(TimeStampedModel):
    ORDER_TYPE_CHOICES = [
        ('SALE', 'Sale'),
        ('RENTAL', 'Rental'),
    ]
    DELIVERY_TYPE_CHOICES = [
        ('PICKUP', 'Pickup'),
        ('DELIVERY', 'Delivery'),
    ]
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('CONFIRMED', 'Confirmed'),
        ('CANCELLED', 'Cancelled'),
    ]

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    order_type = models.CharField(max_length=20, choices=ORDER_TYPE_CHOICES)
    delivery_type = models.CharField(max_length=20, choices=DELIVERY_TYPE_CHOICES)
    delivery_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)  # ₦3,000 if delivery
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.TextField(blank=True, null=True)  # Required for delivery
    paystack_ref = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.order_type} Order #{self.id} - {self.name}"

    def calculate_total(self):
        total = 0

        if self.order_type == 'SALE':
            for item in self.sale_items.all():
                total += item.product.price * item.quantity

        elif self.order_type == 'RENTAL':
            for item in self.rental_items.all():
                base_price = 15000  # ₦15k/day
                days = item.days

                if days == 1:
                    daily_rate = base_price
                elif 2 <= days <= 3:
                    daily_rate = 14000
                elif 4 <= days <= 6:
                    daily_rate = 13000
                else:  # 7+ days
                    daily_rate = 12000

                total += daily_rate * days * item.quantity

        if self.delivery_type == 'DELIVERY':
            total += self.delivery_fee

        self.total_price = total
        return total


class SaleOrderItem(TimeStampedModel):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='sale_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.product} x{self.quantity}"


class RentalOrderItem(TimeStampedModel):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='rental_items')
    rental_product = models.ForeignKey(RentalProduct, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    start_date = models.DateField()
    end_date = models.DateField()
    days = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.rental_product} x{self.quantity} ({self.start_date} to {self.end_date})"