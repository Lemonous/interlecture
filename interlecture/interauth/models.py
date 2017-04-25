from django.db import models
from django.contrib.auth.models import User


class UserActivation(models.Model):
    user = models.OneToOneField(User, related_name='profile')
    activation_key = models.CharField(max_length=128)
    key_expires = models.DateTimeField()

    def __str__(self):#pragma: nocover
        return "Key '%s' for %s expires on %s" % (self.activation_key, self.user, self.key_expires)
