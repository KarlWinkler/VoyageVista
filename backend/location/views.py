from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from .models import Location
from .serializers import LocationSerializer
from rest_framework import viewsets
from rest_framework.response import Response

from .models import Location
from .serializers import LocationSerializer


class LocationViewSet(viewsets.ModelViewSet):
  queryset = Location.objects.all()
  serializer_class = LocationSerializer

