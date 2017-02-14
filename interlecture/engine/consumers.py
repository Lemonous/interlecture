from channels import Group
from channels.sessions import channel_session
from channels.auth import channel_session_user, channel_session_user_from_http

@channel_session_user_from_http
def ws_add(message):
    if(message.user.is_authenticated()):
        message.reply_channel.send({"accept": True})
        message.reply_channel.send({"text": "Welcome"})
        Group("chat").add(message.reply_channel)
    else:
        message.reply_channel.send({"accept": False})

@channel_session_user
def ws_message(message):
    """Incoming messages are handled here - see routing.py."""
    Group("chat").send({"text": message.user.username + "> " + message.content["text"]})

@channel_session_user
def ws_disconnect(message):
    Group("chat").discard(message.reply_channel)

import channels.routing
channel_routing = [
    channels.routing.route("websocket.receive", ws_message),
    channels.routing.route("websocket.connect", ws_add),
    channels.routing.route("websocket.disconnect", ws_disconnect),
  ]
