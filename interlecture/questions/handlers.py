#Request handlers

from questions.models import *
from django.core import serializers
import json
from engine.messaging import need,serverMessage
from engine.access import need_object
    
@need_object(Room,access_rights='read')
def subscribe(request,room=None):
    room.channel().add(request.message.reply_channel)
    request.send(type='NEW_POSTS',posts=room.get_posts())

@need('text')
@need_object(Room,access_rights='write')
@need_object(Post,key='parent_post',optional=True)
def post(request,room=None,parent_post=None,text=None):
    post=Post(room=room,user=request.message.user,text=text,parent_post=parent_post)
    post.save()
    serverMessage(room.channel(),type='NEW_POSTS',posts=[post.get()])

@need_object(Post)
def support(request,post=None):
    post.room.request_access_rights(request,'write')
    post.supporters.add(request.message.user)

handlers={
    'subscribe':subscribe,
    'post':post,
    'support':support
  }
