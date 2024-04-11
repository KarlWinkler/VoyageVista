from rest_framework import serializers
from rest_framework.fields import SerializerMethodField
from .models import (
  Location,
  LocationImage,
  Rating,
  Comment,
)
from authentication.models import (
  User,
  BucketList,
  Visited,
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
  bucket_list = SerializerMethodField()
  visited = SerializerMethodField()

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
      'bucket_list',
      'visited',
    )
    read_only_fields = ('id', 'images', 'ratings', 'comments')

  def get_tags(self, obj):
    tags = obj.ratings.distinct()

    return RatingSerializer(tags, many=True).data

  def get_bucket_list(self, obj):
    user = None
    request = self.context.get("request")
    if request and hasattr(request, "user"):
        user = request.user
    if not user:
      return False

    bucket_list = BucketList.objects.filter(user=user, location=obj)
    return bucket_list.exists()

  def get_visited(self, obj):
    user = None
    request = self.context.get("request")
    if request and hasattr(request, "user"):
        user = request.user
    if not user:
      return False

    visited = Visited.objects.filter(user=user, location=obj)
    return visited.exists()
