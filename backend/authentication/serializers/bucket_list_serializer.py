from rest_framework import serializers
from .models import BucketList

class BucketListSerializer(serializers.ModelSerializer):
  class Meta:
    model = BucketList
    fields = '__all__'
