module Tabster
  SERVER_ERROR     = 500
  AUTH_ERROR       = 401
  NOT_FOUND_ERROR  = 404
  VALIDATION_ERROR = 422

  class ServerError < Kemal::Exceptions::CustomException
    def initialize(env : HTTP::Server::Context, status_code = SERVER_ERROR, message = "Server error")
      env.response.status_code = status_code
      @message = message.as(String)
    end
  end

  class AuthError < ServerError
    def initialize(env : HTTP::Server::Context, message = "Authorization error")
      super(env, AUTH_ERROR, message)
    end
  end

  class NotFoundError < ServerError
    def initialize(env : HTTP::Server::Context, message = "Not Found error")
      super(env, NOT_FOUND_ERROR, message)
    end
  end

  class ValidationError < ServerError
    def initialize(env : HTTP::Server::Context, message = "Validation error")
      super(env, VALIDATION_ERROR, message)
    end
  end

  # Macro for custom error route handlers using `error_response`
  {% for code in (400..431).to_a + [451] + (500..511).to_a %}
    error {{code.id}} do |env, ex|
      error_response(env, {{code.id}}, ex.message)
    end
  {% end %}

  get "/error" do |env|
    set_content_type_json(env)
    raise AuthError.new(env, "Some Auth ERROR")
  end

  def self.error_response(env, status_code, message)
    if env.response.headers.has_key?("Content-Type")
      if env.response.headers["Content-Type"] == "application/json"
        return {status_code: status_code, message: message}.to_json
      end
    end

    message
  end
end
