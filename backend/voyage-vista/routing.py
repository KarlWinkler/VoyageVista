from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import include, re_path
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application
from websockets.consumers import LocationConsumer

application = ProtocolTypeRouter({
  'websocket': AllowedHostsOriginValidator(
    URLRouter(
      [
        re_path(r'^ws/location/(?P<id>([0-9]+))?/$', LocationConsumer.as_asgi())
      ]
    )
  ),
   "http": get_asgi_application(),
})