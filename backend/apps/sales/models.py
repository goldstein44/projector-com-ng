# backend/apps/sales/models.py
from django.db import models
from apps.common.models import TimeStampedModel

class Product(TimeStampedModel):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)  # For SEO-friendly URLs
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)  # In NGN
    lumens = models.IntegerField()
    resolution = models.CharField(max_length=50)  # e.g., "1080p"
    hdmi = models.BooleanField(default=True)
    vga = models.BooleanField(default=False)
    stock = models.PositiveIntegerField(default=0)  # Inventory count
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    description = models.TextField()
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.brand} {self.model}"

    def save(self, *args, **kwargs):
        # Auto-update availability based on stock
        self.is_available = self.stock > 0
        super().save(*args, **kwargs)