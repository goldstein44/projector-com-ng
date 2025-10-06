from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from apps.orders.models import Order, SaleOrderItem, RentalOrderItem
from apps.sales.models import Product
from apps.rentals.models import RentalProduct
from datetime import datetime

class Command(BaseCommand):
    help = 'Seeds the database with test data for cart (orders, sale items, rental items)'

    def handle(self, *args, **kwargs):
        # Create test users
        User.objects.all().delete()  # Clear existing users
        user1 = User.objects.create_user(username='testuser1', email='user1@example.com', password='testpass123')
        user2 = User.objects.create_user(username='testuser2', email='user2@example.com', password='testpass123')

        # Match seeded products from seed_db.py
        products = {
            'Epson Home Cinema 2150': Product.objects.get(slug='epson-home-cinema-2150'),
            'BenQ TK800M': Product.objects.get(slug='benq-tk800m'),
            'Optoma HD146X': Product.objects.get(slug='optoma-hd146x'),
        }

        # Rentals (make sure these exist in seed_db.py too)
        rentals = {
            'Epson Rental 1080p': RentalProduct.objects.get(slug='epson-rental-1080p'),
            'BenQ Rental 4K': RentalProduct.objects.get(slug='benq-rental-4k'),
            'Optoma Rental HD': RentalProduct.objects.get(slug='optoma-rental-hd'),
        }

        # Clear existing orders
        Order.objects.all().delete()

        # Seed Sale Orders
        sale_order1 = Order.objects.create(
            user=user1,
            order_type='SALE',
            delivery_type='DELIVERY',
            delivery_fee=3000.00,
            total_price=0,  # will recalc
            status='PENDING',
            name='Test User 1',
            email='user1@example.com',
            phone='+2348012345678',
            address='123 Lekki Phase 1, Lagos',
            paystack_ref='PAYSTACK_REF_001'
        )
        SaleOrderItem.objects.create(
            order=sale_order1,
            product=products['Epson Home Cinema 2150'],
            quantity=1
        )
        sale_order1.calculate_total()
        sale_order1.save()

        sale_order2 = Order.objects.create(
            user=user2,
            order_type='SALE',
            delivery_type='PICKUP',
            delivery_fee=0.00,
            total_price=0,  # will recalc
            status='CONFIRMED',
            name='Test User 2',
            email='user2@example.com',
            phone='+2348098765432',
            address='',
            paystack_ref='PAYSTACK_REF_002'
        )
        SaleOrderItem.objects.create(
            order=sale_order2,
            product=products['BenQ TK800M'],
            quantity=1
        )
        SaleOrderItem.objects.create(
            order=sale_order2,
            product=products['Optoma HD146X'],
            quantity=1
        )
        sale_order2.calculate_total()
        sale_order2.save()

        # Seed Rental Orders
        rental_order1 = Order.objects.create(
            user=user1,
            order_type='RENTAL',
            delivery_type='DELIVERY',
            delivery_fee=3000.00,
            total_price=0,  # will recalc
            status='PENDING',
            name='Test User 1',
            email='user1@example.com',
            phone='+2348012345678',
            address='123 Lekki Phase 1, Lagos',
            paystack_ref='PAYSTACK_REF_003'
        )
        RentalOrderItem.objects.create(
            order=rental_order1,
            rental_product=rentals['Epson Rental 1080p'],
            quantity=2,
            start_date=datetime(2025, 10, 1).date(),
            end_date=datetime(2025, 10, 1).date(),
            days=1
        )
        rental_order1.calculate_total()
        rental_order1.save()

        rental_order2 = Order.objects.create(
            user=user2,
            order_type='RENTAL',
            delivery_type='PICKUP',
            delivery_fee=0.00,
            total_price=0,  # will recalc
            status='CONFIRMED',
            name='Test User 2',
            email='user2@example.com',
            phone='+2348098765432',
            address='',
            paystack_ref='PAYSTACK_REF_004'
        )
        RentalOrderItem.objects.create(
            order=rental_order2,
            rental_product=rentals['BenQ Rental 4K'],
            quantity=1,
            start_date=datetime(2025, 10, 2).date(),
            end_date=datetime(2025, 10, 4).date(),
            days=3
        )
        rental_order2.calculate_total()
        rental_order2.save()

        self.stdout.write(self.style.SUCCESS('Successfully seeded database with cart test data'))