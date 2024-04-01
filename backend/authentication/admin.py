from django.contrib import admin
from .models import BucketList, Visited, UserTag, UserImage


# Register your models here.
class BucketListAdmin(admin.ModelAdmin):
    list_display = ('user', 'location', 'created_at', 'updated_at')

class VisitedAdmin(admin.ModelAdmin):
    list_display = ('user', 'location', 'created_at', 'updated_at')

class UserTagAdmin(admin.ModelAdmin):
    list_display = ('user', 'tag', 'created_at', 'updated_at')

class UserImageAdmin(admin.ModelAdmin):
    list_display = ('user', 'image', 'created_at', 'updated_at')

admin.site.register(BucketList, BucketListAdmin)
admin.site.register(Visited, VisitedAdmin)
admin.site.register(UserTag, UserTagAdmin)
admin.site.register(UserImage, UserImageAdmin)
