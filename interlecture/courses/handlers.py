#Request handlers

from questions.models import Room
from django.core import serializers
import json
from engine.messaging import need, serverMessage
from engine.access import need_object


def roomDoesNotExist():
    print("ROOM DOESNT EXIST")

def roomDoesExist(classroom):
    print("ROOM EXISTS!!!!!!!!!!!!!!!1 :D:D:D:D:D:D")
    serverMessage(classroom.channel(), type='GO_TO_COURSE', data=[classroom.name])


@need('room')
def findCourse(request, room=None):
    print("looking up room with name " + room + "...")
    try: roomDoesExist(Room.objects.get(name=room))
    except Room.DoesNotExist:
        roomDoesNotExist()


@need('courseCode')
def createCourse(request, courseCode=None):
    print("creating course with name " + courseCode + "...")
    room = Room(name=courseCode)
    room.save()
    try: roomDoesExist(Room.objects.get(name=courseCode))
    except Room.DoesNotExist:
        roomDoesNotExist()


handlers = {
    'goToCourse': findCourse,
    'createCourse': createCourse,
  }
