from rest_framework import routers
from django.urls import path
from . import views


router = routers.SimpleRouter()
router.register(r'images', views.LocationImageViewSet)
router.register(r'ratings', views.RatingViewSet)
router.register(r'comments', views.CommentViewSet)
router.register(r'tags', views.LocationTagViewSet)
router.register(r'', views.LocationViewSet)

urlpatterns = router.urls