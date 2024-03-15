from rest_framework import routers
from django.urls import path
from . import views


router = routers.SimpleRouter()
router.register(r'', views.LocationViewSet)

urlpatterns = router.urls