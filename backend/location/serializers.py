from rest_framework import serializers
from .models import Location


class LocationImageSerializer(serializers.ModelSerializer):
  class Meta:
    model = Location
    fields = '__all__'

class RatingSerializer(serializers.ModelSerializer):
  class Meta:
    model = Location
    fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Location
    fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):
  images = LocationImageSerializer(many=True, read_only=True)
  ratings = RatingSerializer(many=True, read_only=True)
  comments = CommentSerializer(many=True, read_only=True)

  class Meta:
    model = Location
    fields = '__all__'
