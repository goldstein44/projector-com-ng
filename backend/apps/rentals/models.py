# backend/apps/rentals/models.py
from django.db import models
from apps.common.models import TimeStampedModel
from datetime import date


class RentalProduct(TimeStampedModel):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    price_per_day = models.DecimalField(max_digits=10, decimal_places=2, default=15000.00)  # ₦15,000/day
    lumens = models.IntegerField()
    resolution = models.CharField(max_length=50)
    hdmi = models.BooleanField(default=True)
    vga = models.BooleanField(default=False)
    total_quantity = models.PositiveIntegerField(default=0)  # Total units available
    image = models.ImageField(upload_to='rentals/', null=True, blank=True)
    description = models.TextField()

    class Meta:
        verbose_name = "Rental Product"
        verbose_name_plural = "Rental Products"

    def __str__(self):
        return f"{self.brand} {self.model}"


class RentalAvailability(TimeStampedModel):
    rental_product = models.ForeignKey(RentalProduct, on_delete=models.CASCADE, related_name='availabilities')
    date = models.DateField()
    available_quantity = models.PositiveIntegerField()

    class Meta:
        unique_together = ('rental_product', 'date')
        verbose_name = "Rental Availability"
        verbose_name_plural = "Rental Availabilities"

    def __str__(self):
        return f"{self.rental_product} - {self.date} ({self.available_quantity} available)"