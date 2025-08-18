# backend/apps/orders/tests.py
from rest_framework.test import APITestCase, APIClient
from unittest.mock import patch
from apps.sales.models import Product
from apps.rentals.models import RentalProduct
from django.contrib.auth.models import User
from datetime import date, timedelta
from django.test import override_settings


@override_settings(PAYSTACK_SECRET_KEY="test_dummy_key")
class OrderTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass')
        # Authenticate client as the created user
        self.client.force_authenticate(user=self.user)

        self.product = Product.objects.create(
            name="Epson EB-S41", slug="epson-eb-s41", brand="Epson", model="EB-S41",
            price=250000.00, lumens=3300, resolution="SVGA", stock=10, description="Great projector"
        )
        self.rental_product = RentalProduct.objects.create(
            name="BenQ MW535", slug="benq-mw535", brand="BenQ", model="MW535",
            price_per_day=5000.00, lumens=3600, total_quantity=5, description="Rental projector"
        )

    @patch("apps.orders.views.Transaction.initialize")
    def test_create_sale_order(self, mock_initialize):
        """Test creating a sale order with mocked Paystack"""
        # Fake Paystack response
        mock_initialize.return_value = {
            "status": True,
            "data": {"authorization_url": "http://fake-url", "reference": "fake_ref"}
        }

        data = {
            'order_type': 'SALE',
            'delivery_type': 'PICKUP',
            'name': 'John Doe',
            'email': 'john@example.com',
            'phone': '08012345678',
            'items': [{'product_id': self.product.id, 'quantity': 1}]
        }
        response = self.client.post('/api/orders/create_sale/', data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertIn("authorization_url", response.data)

    @patch("apps.orders.views.Transaction.initialize")
    def test_create_rental_order(self, mock_initialize):
        """Test creating a rental order with mocked Paystack"""
        # Fake Paystack response
        mock_initialize.return_value = {
            "status": True,
            "data": {"authorization_url": "http://fake-url", "reference": "fake_ref"}
        }

        today = date.today()
        tomorrow = today + timedelta(days=1)

        data = {
            'order_type': 'RENTAL',
            'delivery_type': 'PICKUP',
            'name': 'Jane Doe',
            'email': 'jane@example.com',
            'phone': '08098765432',
            'items': [{
                'rental_product_id': self.rental_product.id,
                'quantity': 1,
                'start_date': today.strftime("%Y-%m-%d"),
                'end_date': tomorrow.strftime("%Y-%m-%d")
            }]
        }
        response = self.client.post('/api/orders/create_rental/', data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertIn("authorization_url", response.data)