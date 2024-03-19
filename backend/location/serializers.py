from rest_framework import serializers
from .models import (
  Location,
  LocationImage,
  Rating,
  Comment,
  LocationTag,
)


class LocationImageSerializer(serializers.ModelSerializer):
  class Meta:
    model = LocationImage
    fields = '__all__'

class RatingSerializer(serializers.ModelSerializer):
  class Meta:
    model = Rating
    fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Comment
    fields = '__all__'

class LocationTagSerializer(serializers.ModelSerializer):
  class Meta:
    model = LocationTag
    fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):
  images = LocationImageSerializer(many=True, read_only=True)
  ratings = RatingSerializer(many=True, read_only=True)
  comments = CommentSerializer(many=True, read_only=True)

  class Meta:
    model = Location
    fields = (
      'id',
      'name',
      'description',
      'images',
      'ratings',
      'comments',
    )
    read_only_fields = ('id', 'images', 'ratings', 'comments')
