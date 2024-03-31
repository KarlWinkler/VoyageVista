from rest_framework import routers
from django.urls import path
from . import views

router = routers.SimpleRouter()
router.register(r'users', views.UserViewSet)
router.register(r'', views.AuthViewSet)

urlpatterns = router.urls
