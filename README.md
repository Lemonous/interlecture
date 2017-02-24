# Interlecture

1. [Basic Setup](#basic-setup)
  1. [Installing Dependencies](#installing-dependencies)
  2. [Installing Postgres](#installing-postgres)
  3. [Testing that it works](#testing-that-it-works)
2. [General Information](#general-information)

## Basic setup

### Installing Dependencies

It would often be a good idea to use a virtual environment to set this project's packages and dependencies apart from other projects.

Make sure pip3 and yarn are installed:
_Mac OS_
```
brew install python3.6 yarn
```

_Ubuntu 16.04_
```
apt-get ugrade
apt-get install python3.6 yarn
```

Set up the requirements:
```
pip3 install -r interlecture/requirements.txt
yarn
```

If you are having problems installing `psycopg2`, try running this command instead:
```
env LDFLAGS="-I/usr/local/opt/openssl/include -L/usr/local/opt/openssl/lib" pip --no-cache install psycopg2
```

### Installing postgres

_Install on Ubuntu / Mac OS_

Install postgres: `brew install postgres` _or_ `apt-get install postgres`

Initialise a database (set the password to whatever you want): `initdb -D interlecture/ -U interlecture -W`

Start the database: `pg_ctl -D ~/dbs/interlecture/ -l postgresql.log start`

Go into postgres with the new user, then create a new database:
```
psql -U interlecture -d template1
[...]
template1=# CREATE DATABASE interlecture;
```

Make a `local_settings.py` file and define the variables that are imported in `settings.py`. User and database are both `interlecture`, host is usually `127.0.0.1`, and the default port is `5432`.

### Testing That It Works

Test run django with `python manage.py runserver`. If it works, run `python manage.py migrate` to set up the database tables.

In order to be able to log in you must first create a user by running
./manage.py createsuperuser

You're done!

## General Information

The frontend is in interlecture/react/main.jsx.

To rebuild frontend:
```
cd interlecture
./node_modules/.bin/webpack
```

To run the project:
```
python manage.py runserver
```
