from channels.routing import route,include
import engine.consumers

# codecov ignore start
channel_routing = [
    include(engine.consumers.channel_routing)
  ]
# codecov ignore end