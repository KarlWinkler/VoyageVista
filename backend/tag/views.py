from django.shortcuts import render
from .models import Tag
from django.shortcuts import get_object_or_404
from .serializers import TagSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from .forms import TagForm


class TagViewSet(viewsets.ModelViewSet):
	def addTag(request):
		form = TagForm
		if request.method == 'POST':
			form = TagForm(request.POST)
			if form.is_valid():
				form.save()
		context = {'form':form}
		return render(request, 'add-tag.html', context)
		
	def retrieve(self, request, pk=None):
		queryset = Tag.objects.all()
		locationTag = get_object_or_404(queryset, pk=pk)
		serializer_class = TagSerializer
		return Response(serializer_class.data)

