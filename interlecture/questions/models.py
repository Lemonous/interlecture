from django.db import models
import django.contrib.auth.models as auth

class Room(models.Model):
    name = models.CharField(max_length=50,unique=True)
    
    def get_posts(self):
        return [post.get() for post in Post.objects.filter(room=self)]

class Post(models.Model):
    room = models.ForeignKey(Room,on_delete=models.CASCADE)
    user = models.ForeignKey(auth.User,on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    parent_post = models.ForeignKey('self',on_delete=models.CASCADE,null=True)
    def get(self):
        return {
            'id':self.id,
            'room':self.room.name,
            'user':self.user.username,
            'text':self.text,
            'parent_post':self.parent_post.id if self.parent_post else None,
          }
