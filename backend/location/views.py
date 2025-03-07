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

from authentication.models import UserTag
from authentication.serializers.user_tag_serializer import UserTagSerializer

from tag.models import Tag
from tag.serializers import TagSerializer

import random

class LocationViewSet(viewsets.ModelViewSet):
  queryset = Location.objects.all()
  serializer_class = LocationSerializer

  def list(self, request):
    locations_list = request.GET.get('locations', None)
    if locations_list is None:
      queryset = Location.objects.all()
    else:
      locations_list = locations_list.split(',')
      queryset = Location.objects.filter(pk__in=locations_list)

    serializer = LocationSerializer(queryset, many=True)
    return Response(serializer.data)

  @action(detail=True, methods=['get'], url_path='comments', url_name='location-comments')
  def comments(self, request, pk=None):
    location = get_object_or_404(Location, pk=pk)
    comments = location.comments.all()
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)

  @action(detail=True, methods=['get'], url_path='tags', url_name='location-tags')
  def tags(self, request, pk=None):
    tag_ids = Rating.objects.filter(location__id=pk).values_list('tag__id', flat=True)
    tags = Tag.objects.filter(pk__in=tag_ids)
    serializer = TagSerializer(tags, many=True)
    return Response(serializer.data)

  @action(detail=False, methods=['get'], url_name='location-discover')
  def discover(self, request):
    user = request.user
    locations = Location.objects.all()
    if user.is_authenticated:
      user_tags = UserTag.objects.filter(user__id=user.pk).values_list('tag__id', flat=True)
      locations = Location.objects.filter(ratings__tag__in=user_tags).distinct('id')

    serializer = LocationSerializer(self.pick_random_locations(locations), many=True)
    return Response(serializer.data)

  def pick_random_locations(self, locations):
    locations = list(locations)
    random_locations = []
    for i in range(min(10, len(locations))):
      random_locations.append(random.choice(locations))
      locations.pop(locations.index(random_locations[-1]))

    return random_locations

  @action(detail=True, methods=['post'], url_path='add_rating', url_name='location-add-rating')
  def add_rating(self, request, pk=None):
    location = get_object_or_404(Location, pk=pk)
    user = request.user
    ratings = request.data

    for rating in ratings:
      if rating['rating'] < 1 or rating['rating'] > 5:
        continue

      tag = get_object_or_404(Tag, pk=rating['tag'])
      Rating.objects.create(
        location=location,
        user=user,
        tag=tag,
        rating=rating['rating']
      )

    return Response({ 'message': 'Rating added successfully' })


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
