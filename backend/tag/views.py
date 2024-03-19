from django.shortcuts import render
from .models import Tag
from django.shortcuts import get_object_or_404
from .serializers import TagSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from .forms import TagForm


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer