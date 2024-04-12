from django.shortcuts import render
from .models import Tag
from django.shortcuts import get_object_or_404
from .serializers import TagSerializer
from authentication.models import UserTag
from rest_framework import viewsets
from rest_framework.response import Response
from .forms import TagForm
from location.models import Rating


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

    def list(self, request):
        tags = Tag.objects.all()

        if request.GET.get('location_id'):
            location_id = request.GET.get('location_id')
            location_tags = Rating.objects.filter(location__id=location_id)
            tags = Tag.objects.exclude(id__in=location_tags.values_list('tag', flat=True))
        else:  
            user_tags = UserTag.objects.filter(user=request.user)
            tags = Tag.objects.exclude(id__in=user_tags.values_list('tag', flat=True))

        serializer = TagSerializer(tags, many=True)
        return Response(serializer.data)