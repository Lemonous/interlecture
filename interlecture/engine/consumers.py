from channels import Group
from channels.sessions import channel_session
from channels.auth import channel_session_user, channel_session_user_from_http
import json

import questions.handlers

handlers={
    'questions':questions.handlers.handlers
  }
from engine.request import Request

@channel_session_user_from_http
def ws_add(message):
    if(message.user.is_authenticated()):
        message.reply_channel.send({"accept": True})
    else:
        message.reply_channel.send({"accept": False})

@channel_session_user
def ws_message(message):
    """Incoming messages are handled here"""
    Request(message).handle()

@channel_session_user
def ws_disconnect(message):
    pass

import channels.routing
channel_routing = [
    channels.routing.route("websocket.receive", ws_message),
    channels.routing.route("websocket.connect", ws_add),
    channels.routing.route("websocket.disconnect", ws_disconnect),
  ]
