from rest_framework import serializers
from authentication.models import UserTag
from tag.serializers import TagSerializer

class UserTagSerializer(serializers.ModelSerializer):
  tag = TagSerializer(many=False, read_only=True)

  class Meta:
    model = UserTag
    fields = '__all__'
