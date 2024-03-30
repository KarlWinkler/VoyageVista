from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from .models import (
  Location,
  LocationImage,
  Rating,
  Comment,
)
from .serializers import (
  LocationSerializer,
  LocationImageSerializer,
  RatingSerializer,
  CommentSerializer,
  CommentCreateSerializer,
)
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Location
from .serializers import LocationSerializer

class LocationViewSet(viewsets.ModelViewSet):
  queryset = Location.objects.all()
  serializer_class = LocationSerializer

  @action(detail=True, methods=['get'], url_path='comments', url_name='location-comments')
  def comments(self, request, pk=None):
    location = get_object_or_404(Location, pk=pk)
    comments = location.comments.all()
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)


class LocationImageViewSet(viewsets.ModelViewSet):
  queryset = LocationImage.objects.all()
  serializer_class = LocationImageSerializer


class RatingViewSet(viewsets.ModelViewSet):
  queryset = Rating.objects.all()
  serializer_class = RatingSerializer

class CommentViewSet(viewsets.ModelViewSet):
  queryset = Comment.objects.all()

  def get_serializer_class(self):
    if self.action == 'create':
      return CommentCreateSerializer
    return CommentSerializer
