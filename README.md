[![Travis branch](https://img.shields.io/travis/PU-69/interlecture.svg)]() [![Codecov branch](https://img.shields.io/codecov/c/github/PU-69/interlecture.svg)]()

Interlecture 
============

Introduction
------------

Interlecture is a simple message board application we developed as a project in TDT4140 software development. It allows creating chat rooms (courses) and posting, liking and deleting messages there.

The user interface is quite self-explanatory. The registration system only accepts ntnu.no/ntnu.edu emails, but this can easily be fixed by editing `interlecture/interauth/views.py`.

System operator reference
-------------------------

### Installing dependencies

Prerequisites that you need to run the project are `python3.6` and `yarn`. Installing yarn will also automatically install `node`, which it requires. Be sure to install at least yarn `v0.23.2`.

- On _Mac OS_: `brew install python3 yarn`
- On _Ubuntu_: `sudo apt-get install python3.6 yarn`
- On _Fedora_: `sudo dnf install python3.6 yarn`

Note: while running python3.5 or lower is not recommended, it is possible and only requires replacing the `hashlib.sha3_512` function in `interlecture/interauth/views.py` with any other hashing function.

It is a good idea to set up `virtualenv`, so that python packages aren't installed system wide. These commands can be run from the project root, for instance (e.g. the folder where README.md lies):

```bash
$ pip3 install virtualenv
$ virtualenv -p python3.6 ENV_NAME
$ source ENV_NAME/bin/activate
```

Change `ENV_NAME` to something appropriate.

You can now enable virtualenv by sourcing the `activate` file in the virtualenv `bin` folder, and disable it by simply running `deactivate` at any time.

Then use `pip` and `yarn` to install the rest of the project dependencies automatically:

```bash
$ cd interlecture
$ pip install -r requirements.txt
$ yarn
```

### Configuration file

Copy or rename the file `interlecture/interlecture/local_settings.default.py` to `interlecture/interlecture/local_settings.py` and edit it to your preferences. For a debug run, you can leave the most as it is, but specify email host, port, username and password to send user activation emails. You also must set `SECRET_KEY` to some random quoted string, preferably at least 64 characters and truly random.

### Running the server for the first time

Ensure that you are using your virtualenv before doing this, or it will fail.

Go into `interlecture` and run the following commands:

```bash
$ yarn webpack
$ python manage.py migrate
```

The above two commands can be skipped on subsequent runs. Now start the server:

```bash
$ python manage.py runserver <ip>:<port>
```

You can skip `<ip>:<port>` to listen on the default, `localhost:8000`. Now you can open the address in your browser. Server can be stopped with ^C.

#### Advanced topics
Only required if running multiple server processe or multiple server machines.

##### Using administrator account
You can set up administrator account in order to be able to register users without activation mail and to remove users or classrooms. To do so, go to the `interlecture` folder and run this command:

```bash
$ python manage.py createsuperuser
```

and enter user data. You can then login at `http://<ip>:<port>/admin/` and administrate the site using the standard Django admin panel. There are also some features that are currently only avaliable via admin panel, like setting other users than the teacher as moderators to a room.

##### Setting up PostgreSQL

[PostgreSQL](https://www.postgresql.org/) is a advanced database managment system, which runs much better and safer on larger systems than SQLite does. Refer to the PostgreSQL documentation for information about installing PostgreSQL on your system. Once it is set up, create an empty database and change the `DATABASE` variable in the `local_settings.py` to connect to Postgres (if you used the default `local_settings`, simply comment out the SQLite config and uncomment the Postgres config:

```python
DATABASE = {
    'ENGINE': 'django.db.backends.postgresql',
    'NAME': <your database name>,
    'USER': <...>,
    'PASSWORD': <...>,
    'HOST': <...>,
    'PORT': <...>,
}
```

You must then re-run `manage.py migrate` before starting the server.

##### Setting up redis

[redis](https://redis.io/) is an in-memory data structure system and is the recommended backend for django-channels. Refer to redis documentation for information about installing it on your system. To use it as a messaging backend, you must first install `asgi_redis`:

```bash
$ pip install asgi_redis
```

Then swap the comment on `CHANNEL` variable in `local_settings.py` and optionally edit the new value to point to your redis server. Now launch your redis server (simply `redis-server`) and start the Django server normally.

However, the point of redis is that you can run multiple "worker" threads in parallel, even on different machines as long as they share a single Redis server and database. The server startup procedure is slightly changed then. First start the web interface:

```bash
$ daphne interlecture.asgi:channel_layer
```

Then lanuch worker threads:

```bash
$ python manage.py runworker
```

Refer to the [channels documentation](https://channels.readthedocs.io/en/stable/deploying.html) for more information about its deployment facilities.
