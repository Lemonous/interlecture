from channels.routing import route,include
import playground.consumers

channel_routing = [
    route("websocket.receive", playground.consumers.ws_message),
    route("websocket.connect", playground.consumers.ws_add),
    route("websocket.disconnect", playground.consumers.ws_disconnect),
  ]
