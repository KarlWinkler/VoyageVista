from django.contrib import admin
from .models import (
  Location,
  LocationImage,
  Rating,
  Comment,
)

# Register your models here.
class LocationAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_at', 'updated_at')

class LocationImageAdmin(admin.ModelAdmin):
    list_display = ('location', 'image', 'created_at', 'updated_at')

class RatingAdmin(admin.ModelAdmin):
    list_display = ('user', 'location', 'tag', 'rating', 'created_at', 'updated_at')

class CommentAdmin(admin.ModelAdmin):
    list_display = ('user', 'location', 'content', 'created_at', 'updated_at')


admin.site.register(Location, LocationAdmin)
admin.site.register(LocationImage, LocationImageAdmin)
admin.site.register(Rating, RatingAdmin)
admin.site.register(Comment, CommentAdmin)
