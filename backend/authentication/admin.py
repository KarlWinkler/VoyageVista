from django.contrib import admin

from .models import BucketList, Visited

# Register your models here.
class BucketListAdmin(admin.ModelAdmin):
    list_display = ('user', 'location', 'created_at', 'updated_at')

class VisitedAdmin(admin.ModelAdmin):
    list_display = ('user', 'location', 'created_at', 'updated_at')

admin.site.register(BucketList, BucketListAdmin)
admin.site.register(Visited, VisitedAdmin)