#Request handlers

import channels
from questions.models import *
from django.core import serializers
import json
from engine.messaging import serverMessage
from engine.access import need_access

def room_channel(room):
    return channels.Group('interlecture.questions.room%d'%room.id)
    
@need_access(Room,'read')
def subscribe(request,room=None):
    room_channel(room).add(request.message.reply_channel)
    request.send(type='NEW_POSTS',posts=room.get_posts())

@need_access(Room,'write')
def post(request,room=None):
    post=Post(room=room,user=request.message.user,text=request.text.text)
    post.save()
    serverMessage(room_channel(room),type='NEW_POSTS',posts=[post.get()])

handlers={
    'subscribe':subscribe,
    'post':post
  }
