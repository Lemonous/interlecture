# Interlecture [![Travis branch](https://img.shields.io/travis/PU-69/interlecture.svg)]() [![Codecov branch](https://img.shields.io/codecov/c/github/PU-69/interlecture.svg)]()

1. [Basic Setup](#basic-setup)
  1. [Installing Dependencies](#installing-dependencies)
  2. [Installing Postgres](#installing-postgres)
  3. [Testing that it works](#testing-that-it-works)
2. [General Information](#general-information)
3. [Using Jest](#using-jest)

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

Install postgres: `brew install postgres` _or_ `apt-get install postgresql`

On linux based systems you may need to follow theese instructions: http://dba.stackexchange.com/questions/52849/how-do-i-install-postgresql-in-debian-ubuntu

Initialise a database (set the password to whatever you want): `initdb -D  ~/dbs/interlecture/ -U interlecture -W`

Start the database: `pg_ctl -D ~/dbs/interlecture/ -l postgresql.log start`

If the command pg_ctl is not found insert `PATH=$PATH:/usr/lib/postgresql/9.5/bin
export PATH`
into .profile and run `. .profile` (or exchange 9.5 with correct version number)

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

Create 'test' classroom using django-admin.

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

## Using Jest

Jest is a test tool that is based on taking a "picture" of the app and compare future versions against this picture, looking for changes.

The first time Jest is run it will save a snapshot-file that describes the end-product of the imported components, and every time a test is run after this it creates a temporary snapshot-file and compares it to the saved snapshot. If there is any difference at all the test will fail and the difference will be printed.

To run all all jest tests simply type
```
yarn jest
```

If the test fails take a look at what the diff and see if it makes sense and run the application and see if the component looks like it should.
If you did change something in the component and everything is working like you should you have to update the snapshot.
To update a snapshot type
```
yarn jest -- -u
```
the "--" is for skipping yarn options and the "-u" is shorthand for update.

To create a new test create a file named <component>.react-test.js in /interlecture/client/\_\_tests\_\_ where you import the component to be tested.
In some components we are connecting the redux-state to the component, so that a redux-infused component is exported. To solve this problem we can mock the redux-state, which needs a bit of work to get up and running, or we can just export the component before the state is connected. This is the case for the Classroom component.
Take a look at classroom.react-test.js to see a working example.

If you want to run jest tests everytime you save a file that is being tested you can type
```
yarn test:watch
```
This has been defined in package.json, and is just a short for
```
yarn jest -- --watch
```
