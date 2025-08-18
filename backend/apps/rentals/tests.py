# backend/apps/rentals/tests.py
from django.test import TestCase
from rest_framework.test import APIClient
from .models import RentalProduct, RentalAvailability
from datetime import date, timedelta

class RentalTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.rental_product = RentalProduct.objects.create(
            name="Epson EB-X41", slug="epson-eb-x41", brand="Epson", model="EB-X41",
            price_per_day=15000.00, lumens=3600, resolution="XGA", total_quantity=5, description="Rental projector"
        )
        self.availability = RentalAvailability.objects.create(
            rental_product=self.rental_product, date=date.today(), available_quantity=5
        )

    def test_get_rentals(self):
        response = self.client.get('/api/rentals/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

    def test_check_availability(self):
        start_date = date.today()
        end_date = start_date + timedelta(days=2)
        response = self.client.get(f'/api/rentals/epson-eb-x41/availability/?start_date={start_date}&end_date={end_date}')
        self.assertEqual(response.status_code, 200)