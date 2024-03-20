from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from .models import (
  Location,
  LocationImage,
  Rating,
  Comment,
  LocationTag,
)
from .serializers import (
  LocationSerializer,
  LocationImageSerializer,
  RatingSerializer,
  CommentSerializer,
)
from rest_framework import viewsets

from .models import Location
from .serializers import LocationSerializer


class LocationViewSet(viewsets.ModelViewSet):
  queryset = Location.objects.all()
  serializer_class = LocationSerializer


class LocationImageViewSet(viewsets.ModelViewSet):
  queryset = LocationImage.objects.all()
  serializer_class = LocationImageSerializer


class RatingViewSet(viewsets.ModelViewSet):
  queryset = Rating.objects.all()
  serializer_class = RatingSerializer


class CommentViewSet(viewsets.ModelViewSet):
  queryset = Comment.objects.all()
  serializer_class = CommentSerializer
