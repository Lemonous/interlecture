from django.db import models
import django.contrib.auth.models as auth

class Classroom(models.Model):
    name = models.CharField(max_length=50,unique=True)

class Question(models.Model):
    classroom = models.ForeignKey(Classroom,on_delete=models.CASCADE)
    user = models.ForeignKey(auth.User,on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    def dictize(self):
        return {'classroom':self.classroom.name,'user':self.user.username,'text':self.text}
