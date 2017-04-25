import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEBUG=True
SECRET_KEY=''

ALLOWED_HOSTS=['localhost']

DATABASE={'ENGINE': 'django.db.backends.sqlite3','NAME': os.path.join(BASE_DIR, 'db.sqlite3'),}
#DATABASE={
#        'ENGINE': 'django.db.backends.postgresql',
#        'NAME': <your database name>,
#        'USER': <...>,'PASSWORD': <...>,
#        'HOST': <...>,'PORT': <...>,
#    }


HOSTNAME='localhost:8000'
EMAIL_FROM='activation@interlecture.no'
EMAIL = {
    'HOST': 'example.com',
    'PORT': 587,
    'USER': 'example@example.com',
    'PASSWORD': 'example'
}

CHANNEL={'BACKEND':'asgiref.inmemory.ChannelLayer'}
#CHANNEL={'BACKEND': 'asgi_redis.RedisChannelLayer','hosts':[('localhost',6379)]}
