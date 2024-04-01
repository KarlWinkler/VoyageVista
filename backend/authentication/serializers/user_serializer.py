from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from django.contrib.auth.models import User
from authentication.models import UserImage


class UserImageSerializer(ModelSerializer):
  class Meta:
    model = UserImage
    fields = '__all__'


class UserSerializer(ModelSerializer):
  images = UserImageSerializer(many=True, read_only=True)

  class Meta:
    model = User
    fields = ('id', 'username', 'images', 'email', 'first_name', 'last_name')
