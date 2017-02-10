from channels import Group


def ws_add(message):
    message.reply_channel.send({"accept": True})
    message.reply_channel.send({"text": "Welcome"})
    Group("chat").add(message.reply_channel)


def ws_message(message):
    """Incoming messages are handled here - see routing.py."""
    Group("chat").send({"text": "> " + message.content["text"]})


def ws_disconnect(message):
    Group("chat").discard(message.reply_channel)
