# backend/apps/orders/views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Order, SaleOrderItem, RentalOrderItem
from apps.sales.models import Product 
from apps.rentals.models import RentalProduct, RentalAvailability
from .serializers import OrderSerializer
from paystackapi.transaction import Transaction
from decimal import Decimal
from datetime import datetime, timedelta
from django.core.mail import send_mail
from django.conf import settings

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    @action(detail=False, methods=['post'])
    def create_sale(self, request):
        data = request.data
        items = data.get('items', [])
        delivery_type = data.get('delivery_type', 'PICKUP')
        delivery_fee = Decimal('3000.00') if delivery_type == 'DELIVERY' else Decimal('0.00')
        name = data.get('name')
        email = data.get('email')
        phone = data.get('phone')
        address = data.get('address') if delivery_type == 'DELIVERY' else None

        # Calculate total price
        total_price = delivery_fee
        for item in items:
            product = Product.objects.get(id=item['product_id'])
            total_price += product.price * item['quantity']
            if product.stock < item['quantity']:
                return Response({'error': f'Insufficient stock for {product.name}'}, status=400)

        # Initialize Paystack transaction
        transaction = Transaction(authorization_key=settings.PAYSTACK_SECRET_KEY)
        response = transaction.initialize(
            amount=int(total_price * 100),  # Paystack expects kobo
            email=email,
            reference=f'sale_{datetime.now().timestamp()}'
        )
        if response['status']:
            # Create order
            order = Order.objects.create(
                order_type='SALE',
                delivery_type=delivery_type,
                delivery_fee=delivery_fee,
                total_price=total_price,
                name=name,
                email=email,
                phone=phone,
                address=address,
                paystack_ref=response['data']['reference']
            )
            # Create sale items and update stock
            for item in items:
                product = Product.objects.get(id=item['product_id'])
                SaleOrderItem.objects.create(
                    order=order,
                    product=product,
                    quantity=item['quantity']
                )
                product.stock -= item['quantity']
                product.save()

            # Send confirmation email
            send_mail(
                'Order Confirmation',
                f'Your order #{order.id} has been placed. Total: ₦{order.total_price}',
                'no-reply@projector.com.ng',
                [email],
                fail_silently=True,
            )
            return Response({'authorization_url': response['data']['authorization_url']}, status=201)
        return Response({'error': 'Payment initialization failed'}, status=400)

    @action(detail=False, methods=['post'])
    def create_rental(self, request):
        data = request.data
        items = data.get('items', [])
        delivery_type = data.get('delivery_type', 'PICKUP')
        delivery_fee = Decimal('3000.00') if delivery_type == 'DELIVERY' else Decimal('0.00')
        name = data.get('name')
        email = data.get('email')
        phone = data.get('phone')
        address = data.get('address') if delivery_type == 'DELIVERY' else None

        # Calculate total price and validate availability
        total_price = delivery_fee
        for item in items:
            rental_product = RentalProduct.objects.get(id=item['rental_product_id'])
            start_date = datetime.strptime(item['start_date'], '%Y-%m-%d').date()
            end_date = datetime.strptime(item['end_date'], '%Y-%m-%d').date()
            days = (end_date - start_date).days + 1
            total_price += rental_product.price_per_day * item['quantity'] * days

            # Check availability
            for date in [start_date + timedelta(days=x) for x in range(days)]:
                availability, _ = RentalAvailability.objects.get_or_create(
                    rental_product=rental_product,
                    date=date,
                    defaults={'available_quantity': rental_product.total_quantity}
                )
                if availability.available_quantity < item['quantity']:
                    return Response({'error': f'Insufficient availability for {rental_product.name} on {date}'}, status=400)

        # Initialize Paystack transaction
        transaction = Transaction(authorization_key=settings.PAYSTACK_SECRET_KEY)
        response = transaction.initialize(
            amount=int(total_price * 100),
            email=email,
            reference=f'rental_{datetime.now().timestamp()}'
        )
        if response['status']:
            # Create order
            order = Order.objects.create(
                order_type='RENTAL',
                delivery_type=delivery_type,
                delivery_fee=delivery_fee,
                total_price=total_price,
                name=name,
                email=email,
                phone=phone,
                address=address,
                paystack_ref=response['data']['reference']
            )
            # Create rental items and update availability
            for item in items:
                rental_product = RentalProduct.objects.get(id=item['rental_product_id'])
                start_date = datetime.strptime(item['start_date'], '%Y-%m-%d').date()
                end_date = datetime.strptime(item['end_date'], '%Y-%m-%d').date()
                days = (end_date - start_date).days + 1
                RentalOrderItem.objects.create(
                    order=order,
                    rental_product=rental_product,
                    quantity=item['quantity'],
                    start_date=start_date,
                    end_date=end_date,
                    days=days
                )
                # Update availability
                for date in [start_date + timedelta(days=x) for x in range(days)]:
                    availability = RentalAvailability.objects.get(rental_product=rental_product, date=date)
                    availability.available_quantity -= item['quantity']
                    availability.save()

            # Send confirmation email
            send_mail(
                'Booking Confirmation',
                f'Your booking #{order.id} has been placed. Total: ₦{order.total_price}',
                'no-reply@projector.com.ng',
                [email],
                fail_silently=True,
            )
            return Response({'authorization_url': response['data']['authorization_url']}, status=201)
        return Response({'error': 'Payment initialization failed'}, status=400)