# backend/apps/rentals/views.py

from datetime import datetime
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import RentalProduct, RentalAvailability
from .serializers import RentalProductSerializer, RentalAvailabilitySerializer


class RentalProductViewSet(viewsets.ModelViewSet):
    queryset = RentalProduct.objects.all()
    serializer_class = RentalProductSerializer
    lookup_field = 'slug'

    @action(detail=True, methods=['get'])
    def availability(self, request, slug=None):
        rental_product = self.get_object()
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        if not (start_date and end_date):
            return Response({'error': 'start_date and end_date are required'}, status=400)
        
        try:
            start = datetime.strptime(start_date, '%Y-%m-%d').date()
            end = datetime.strptime(end_date, '%Y-%m-%d').date()
            availabilities = RentalAvailability.objects.filter(
                rental_product=rental_product,
                date__range=[start, end]
            ).order_by('date')
            
            serializer = RentalAvailabilitySerializer(availabilities, many=True)
            return Response(serializer.data)
        except ValueError:
            return Response({'error': 'Invalid date format'}, status=400)
