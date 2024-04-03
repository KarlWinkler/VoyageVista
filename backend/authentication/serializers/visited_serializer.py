from rest_framework import serializers
from authentication.models import Visited
from location.serializers import LocationSerializer

class VisitedSerializer(serializers.ModelSerializer):
  location = LocationSerializer(many=False, read_only=True)

  class Meta:
    model = Visited
    fields = '__all__'
