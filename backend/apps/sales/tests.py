# backend/apps/sales/tests.py
from django.test import TestCase
from rest_framework.test import APIClient
from .models import Product

class ProductTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.product = Product.objects.create(
            name="Epson EB-S41", slug="epson-eb-s41", brand="Epson", model="EB-S41",
            price=250000.00, lumens=3300, resolution="SVGA", stock=10, description="Great projector"
        )

    def test_get_products(self):
        response = self.client.get('/api/products/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

    def test_get_product_detail(self):
        response = self.client.get('/api/products/epson-eb-s41/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['name'], "Epson EB-S41")
