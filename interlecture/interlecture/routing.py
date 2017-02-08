from channels.routing import route,include
import playground.consumers

channel_routing = [
    route("websocket.receive", playground.consumers.ws_message),
  ]
