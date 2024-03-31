from rest_framework import serializers
from authentication.models import Visited

class VisitedSerializer(serializers.ModelSerializer):
  class Meta:
    model = Visited
    fields = '__all__'
