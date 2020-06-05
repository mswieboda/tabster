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

To run the React dev server, first `cd` into `./react` directory

```
yarn start
```

To compile the React build for releasing:

```
yarn build
```

## Heroku Release

To deploy to heroku, first add the custom crystal buildpack:

```
heroku create app_name --buildpack https://github.com/84codes/heroku-buildpack-crystal.git
```

Then add the nodejs buildpack for yarn installation and building release assets:

```
heroku buildpacks:add --index 1 heroku/nodejs
```

then to deploy:

```
git push heroku master
```

Make sure the web service is initially set up to run one web node:

```
heroku ps:scale web=1
```

and to check which processes are running (`web` should be `up`):

```
heroku ps
```

To create DB, or to run migrations, use the `sam` Procfile process-type:

```
heroku run sam db:create
heroku run sam db:migrate
heroku run sam some_other_task
```
