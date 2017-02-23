# Interlecture

## Basic setup

Make sure pip3 and yarn is installed, then run requirements.sh to install reqired packages.

The frontend is in interlecture/react/main.jsx.

To rebuild frontend:
cd interlecture
./node_modules/.bin/webpack


In order to be able to log in you must first create a user by running
./manage.py createsuperuser

## Installing postgres

_Install on Ubuntu / Mac OS_

Initialise a database (set the password to whatever you want): `initdb -D interlecture/ -U interlecture -W`

Start the database: `pg_ctl -D ~/dbs/interlecture/ -l postgresql.log start`

If you are having problems installing `psycopg2`, try running this command instead:
```env LDFLAGS="-I/usr/local/opt/openssl/include -L/usr/local/opt/openssl/lib" pip --no-cache install psycopg2```

Make a `local_settings.py` file and define the variables that are imported in `settings.py`. User and database are both `interlecture`, host is usually `127.0.0.1`, and the default port is `5432`.

*(WIP)*
