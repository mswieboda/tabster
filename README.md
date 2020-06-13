# tabster

## Installation

```
shards install
```

## Usage

Needed to find openssl library (installed via `brew install openssl`)

```
# can put this in `.zshrc` / `.bash_profile` for ease of use:
export PKG_CONFIG_PATH="/usr/local/opt/openssl@1.1/lib/pkgconfig"
```

To run the backend Kemal web app (port 3001, configurable in Makefile):

```
make tabster
```

To run migrations, create DB, etc, access `sam` via `make`:

```
make sam db:create
make sam db:migrate
```

To run the React dev server

```
yarn start
```

## Heroku Setup

To setup the app with [Heroku](https://heroku.com), first add the custom crystal buildpack:

```
heroku create app_name --buildpack https://github.com/84codes/heroku-buildpack-crystal.git
```

Then add the nodejs buildpack for yarn installation and building release assets:

```
heroku buildpacks:add --index 1 heroku/nodejs
```

Make sure the web service is initially set up to run one web node:

```
heroku ps:scale web=1
```

## Heroku Release

To kick off a new deploy/release

```
git push heroku master
```

and to check which processes are running (`web` should be `up`):

```
heroku ps
```

On each release any pending migrations are ran via `release: ./bin/sam db:migrate` in the `Procfile`.

To run manual DB tasks, or `sam` tasks this can be done via:

```
heroku run sam db:migrate
heroku run sam db:rollback
heroku run sam some_other_task
```
