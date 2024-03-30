import asyncio
import json
from channels.consumer import AsyncConsumer

class LocationConsumer(AsyncConsumer):
  async def websocket_connect(self, event):
    location_id = self.scope['url_route']['kwargs']['id']
    location_channel = f"location_{location_id}"
    self.location_channel = location_channel
    await self.channel_layer.group_add(
      location_channel,
      self.channel_name
    )
    await self.send({
      "type": "websocket.accept"
    }) 
    
  async def websocket_receive(self, event):
    data = json.loads(event.get('text', None))
    print('receive', data)
    print('location', self.location_channel)
    await self.channel_layer.group_send(
    self.location_channel,
    {
        "type": "location.message",
        "location": data.get('location_id', None),
        "user": data.get('user', None),
        "comment": data.get('comment', None)
    })
  
  async def location_message(self, event):
    response = {
      "location": event['location'],
      "user": event['user'],
      "comment": event['comment']
    }
    await self.send({
        "type": 'websocket.send',
        "text": json.dumps(response),
    })

  async def websocket_send(self, event):
    await self.send({
        "type": 'websocket.send',
        'text': event['text']
    })
      
  async def websocket_disconnect(self, event):
    print('disconnected', event)