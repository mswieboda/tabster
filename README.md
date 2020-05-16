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

To run the backend Kemal web app:

```
crystal run src/tabster.cr
```
