from rest_framework import serializers
from rest_framework.fields import SerializerMethodField
from .models import (
  Location,
  LocationImage,
  Rating,
  Comment,
)
from tag.serializers import TagSerializer
from authentication.serializers.user_serializer import UserSerializer


class LocationImageSerializer(serializers.ModelSerializer):
  class Meta:
    model = LocationImage
    fields = '__all__'

class RatingSerializer(serializers.ModelSerializer):
  tag = TagSerializer(read_only=True)

  class Meta:
    model = Rating
    fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only=True)

  class Meta:
    model = Comment
    fields = '__all__'

class CommentCreateSerializer(serializers.ModelSerializer):
  class Meta:
    model = Comment
    fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):
  images = LocationImageSerializer(many=True, read_only=True)
  ratings = RatingSerializer(many=True, read_only=True)
  comments = CommentSerializer(many=True, read_only=True)
  tags = SerializerMethodField()

  class Meta:
    model = Location
    fields = (
      'id',
      'name',
      'description',
      'images',
      'ratings',
      'comments',
      'tags',
    )
    read_only_fields = ('id', 'images', 'ratings', 'comments')

  def get_tags(self, obj):
    tags = obj.ratings.distinct()

    return RatingSerializer(tags, many=True).data
