from django.db import models
import django.contrib.auth.models as auth
import channels


class Room(models.Model):
    name = models.CharField(max_length=50,unique=True)
    
    def get_posts(self):
        return [post.get() for post in Post.objects.filter(room=self)]
    
    def channel(self):
        return channels.Group('interlecture.questions.room%d'%self.id)
    
    def request_access_rights(self,user,rights):
        pass

class Post(models.Model):
    room = models.ForeignKey(Room,on_delete=models.CASCADE)
    user = models.ForeignKey(auth.User,on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    parent_post = models.ForeignKey('self',on_delete=models.CASCADE,null=True)
    supporters = models.ManyToManyField(auth.User,related_name='supported')
    datetime = models.DateTimeField(auto_now_add=True)
    
    def get(self):
        return {
            'id':self.id,
            'room':self.room.name,
            'user':self.user.username,
            'text':self.text,
            'datetime':str(self.datetime),
            'parent_post':self.parent_post.id if self.parent_post else None,
            'supporters':self.supporters.count()
          }
    
    def request_access_rights(self,user,rights):
        pass
