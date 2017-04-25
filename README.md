[![Travis branch](https://img.shields.io/travis/PU-69/interlecture.svg)]() [![Codecov branch](https://img.shields.io/codecov/c/github/PU-69/interlecture.svg)]()

Interlecture 
============

Introduction
------------

Interlecture is a simple message board application we developed as a project in TDT4140 software development. It allows creating chat rooms (courses) and posting, liking and deleting messages there.

The user interface is quite self-explanatory. The registration system only accepts ntnu.no/ntnu.edu emails, but this can easily be fixed by editing `interlecture/interauth/views.py`.

System operator reference
-------------------------

### Installign dependencies

Mandatory dependencies you must install manually are `python3.6` (probably you have this already) and `yarn`.
- On _Mac OS_: `brew install python3.6 yarn`
- On _Ubuntu_: `sudo apt-get install python3.6 yarn`
- On _Fedora_: `sudo dnf install python3.6 yarn`

Note: while running python3.5 is not recommended, it is possible and only requiers replacing `hashlib.sha3_512` function in file `interlecture/interauth/views.py`.

It is a good idea to set up python virtualenv, so that pip packages aren't installed system wide:
```
(repository root)$ pip3 install virtualenv
(repository root)$ virtualenv .
(repository root)$ cd interlecture
```

Then use `pip` and `yarn` to install the rest of dependencies automatically:
```
interlecture$  pip3 install -r requirements.txt
interlecture$ yarn
```

### Configuration file
Copy rename the file `(repository root) /interlecture/interlecture/local_settings.defailt.py` to `(repository root) /interlecture/interlecture/local_settings.py` and edit it to your preferences. For a debug run, you can leave the most as it is, but specify email host, port, username and password to send user activation emails. You also must set `SECRET_KEY` to some random quoted string.

### Running the server for the first time
```
interlecture$ yarn webpack
interlecture$ ../bin/python3 manage.py migrate
```
The above two can be skipped on subsequent runs. Now start the server:
```
interlecture$ ../bin/python3 manage.py runserver <ip>:<port>
```
You can skip `<ip>:<port>` for listening on <localhost:8000>. Now you can open the address in your browser. Server can be stopped with ^C.

#### Advanced topics
Only required if running multiple server processe or multiple server machines.

##### Using administrator account
You can set up administrator account in order to be able to register users without activation mail and to remove users or classrooms. To do so, run
```
interlecture$ ../bin/python3 manage.py createsuperuser
```
and enter user data. You can then login at `http://yoursite/admin/` and access database using standard django admin panel. There are also some features that are currently only avaliable via admin panel, like setting more than one moderator to a room.

##### Setting up PostgreSQL
[PostgreSQL](https://www.postgresql.org/) is a advanced database managment system, which allows Refer to PostgreSQL documentation for information about installing PostgreSQL on your system. Once it is set up, create an empty database and change `DATABASE=...` variable in the `local_settings.py` to:
```
DATABASE={
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': <your database name>,
        'USER': <...>,'PASSWORD': <...>,
       'HOST': <...>,'PORT': <...>,
    }
```
You must then re-run `manage.py migrate` before starting the server.

##### Setting up redis
[redis](https://redis.io/) is a in-memory data structure system and is the recommended backend for django-channels. Refer to redis documentation for information about installing it on your system. To use it as a messaging backend, you must first install asgi_redis:
```
(repository root)$ ./bin/pip install asgi_redis
```
Then swap the comment on `CHANNEL=` variable in `local_settings.py` and optionally edit the new value to point to your redis server. Now launch your redis server (simply `redis-server`) and start django server normaly.

However, the point of redis is that you can run multiple "worker" threads in parallel, even on different machines as long as they share redis server and database. The server startup procedure is slightly changed then. First start the web interface:
```
interlecture$ ../bin/daphne interlecture.asgi:channel_layer
```
Then lanuch worker threads:
```
interlecture$ ../bin/python3 manage.py runworker
```

Refer to [channels documentation](https://channels.readthedocs.io/en/stable/deploying.html) for more information about its deployment facilities.
