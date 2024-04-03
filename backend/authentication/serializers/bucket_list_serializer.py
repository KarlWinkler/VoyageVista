from rest_framework import serializers
from authentication.models import BucketList
from location.serializers import LocationSerializer

class BucketListSerializer(serializers.ModelSerializer):
  location = LocationSerializer(many=False, read_only=True)

  class Meta:
    model = BucketList
    fields = '__all__'
