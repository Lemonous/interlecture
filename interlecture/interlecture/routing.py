from channels.routing import route,include
import engine.consumers

channel_routing = [
    include(engine.consumers.channel_routing)
  ]