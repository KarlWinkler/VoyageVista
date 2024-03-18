from rest_framework import routers
from django.urls import path
from . import views

router = routers.SimpleRouter()
router.register(r'', views.TagViewSet)

urlpatterns = router.urls