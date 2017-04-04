#Request handlers

from questions.models import Room
from django.core import serializers
import json
from engine.messaging import need,serverMessage
from engine.access import need_object


def roomDoesNotExist():
    print("ROOM DOESNT EXIST")

def roomDoesExist():
    print("ROOM EXISTS!!!!!!!!!!!!!!!1 :D:D:D:D:D:D")

@need('room')
def findCourse(request, room=None):
    print("looking up room with name " + room + "...")
    try: Room.objects.get(name=room)
    except Room.DoesNotExist:
        roomDoesNotExist()
    else: roomDoesExist()

handlers={
    'goToCourse': findCourse,
  }
