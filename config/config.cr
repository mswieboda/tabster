require "dotenv"
require "crystal-environment"

Dotenv.load?

# uses CRYSTAL_ENV / Crystal.env.name for KEMAL_ENV"
ENV["KEMAL_ENV"] = Crystal.env.name

require "./initializers/**"
require "../src/models/*"
