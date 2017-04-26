import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEBUG = True
SECRET_KEY = 'fdsafdsafdsafdsa'

ALLOWED_HOSTS = ['localhost']

DATABASE = {
    'ENGINE': 'django.db.backends.sqlite3',
    'NAME': os.path.join(BASE_DIR, 'db.sqlite3')
}

# Uncomment and fill in this if you want to use postgreSQL for the database instead of sqlite
# You should also comment out the definition above
# Remember to change HOST and PORT if you are not using the defaults
"""
DATABASE = {
    'ENGINE': 'django.db.backends.postgresql',
    'NAME': 'YOUR_DATABASE_NAME',
    'USER': 'POSTGRES_USERNAME',
    'PASSWORD': 'POSTGRES_PASSWORD',
    'HOST': '127.0.0.1',
    'PORT': '5432',
}
"""


HOSTNAME = 'localhost:8000'
EMAIL_FROM = 'activation@interlecture.no'

EMAIL = {
    'HOST': 'example.com',
    'PORT': 587,
    'USER': 'example@example.com',
    'PASSWORD': 'example'
}

CHANNEL = {'BACKEND': 'asgiref.inmemory.ChannelLayer'}

# Uncomment this if you want to use redis for websocket channels instead of the in-memory layer.
# You should also comment out the definition above
"""
CHANNEL = {
    'BACKEND': 'asgi_redis.RedisChannelLayer',
    'hosts': [
        ('localhost',6379)
    ]
}
"""