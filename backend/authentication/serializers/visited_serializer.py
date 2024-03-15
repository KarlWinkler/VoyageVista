from rest_framework import serializers
from .models import Visited

class VisitedSerializer(serializers.ModelSerializer):
  class Meta:
    model = Visited
    fields = '__all__'
