from django.contrib import admin
from .models import BucketList, Visited, UserTag

admin.site.register(BucketList)
admin.site.register(Visited)
admin.site.register(UserTag)
