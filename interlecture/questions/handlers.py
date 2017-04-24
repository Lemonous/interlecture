#Request handlers

from questions.models import *
from django.core import serializers
import json
from engine.messaging import need,serverMessage
from engine.access import need_object

def broadcastPost(post):
    serverMessage(post.room.channel(),type='NEW_POSTS',data=[post.get()])

@need_object(Room,access_rights='read',by='name')
def subscribe(request,room=None):
    room.channel().add(request.message.reply_channel)
    request.send(type='NEW_POSTS',data=room.get_posts())

@need('text')
@need_object(Room,access_rights='write',by='name')
@need_object(Post,key='parent_post',optional=True)
def post(request,room=None,parent_post=None,text=None):
    post=Post(room=room,user=request.message.user,text=text,parent_post=parent_post)
    post.save()
    broadcastPost(post)

@need_object(Post)
def support(request,post=None):
    post.room.request_access_rights(request,'write')
    if request.message.user in post.supporters.all():
        post.supporters.remove(request.message.user)
    else:
        post.supporters.add(request.message.user)
    post.save()
    broadcastPost(post)

@need_object(Post,access_rights='delete')
def delete(request,post=None):
    serverMessage(post.room.channel(),type='DELETE_POST',post=post.id)
    post.delete()

handlers={
    'subscribe':subscribe,
    'post':post,
    'support':support,
    'delete':delete
  }
