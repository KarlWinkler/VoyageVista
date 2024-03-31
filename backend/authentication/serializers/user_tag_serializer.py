from rest_framework import serializers
from authentication.models import UserTag

class UserTagSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserTag
    fields = '__all__'
