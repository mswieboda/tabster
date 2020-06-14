module Tabster
  def self.current_user!(env)
    auth_cookie = env.request.cookies["auth"]?

    if auth_cookie
      user = User.get?(auth_cookie.value)

      if user
        sign_in(env, user)

        user
      else
        sign_out(env)

        raise AuthError.new(env, "Invalid credentials")
      end
    else
      raise AuthError.new(env, "Not authorized")
    end
  end

  def self.current_user(env)
    auth_cookie = env.request.cookies["auth"]?

    if auth_cookie
      user = User.get?(auth_cookie.value)

      if user
        sign_in(env, user)
      else
        sign_out(env)
      end

      user
    end
  end

  def self.current_user_id(env)
    current_user(env).try(&.id)
  end

  def self.sign_in(env, user)
    # TODO: add `secure: true` after HTTPS implemented
    auth_cookie = HTTP::Cookie.new(
      name: "auth",
      value: user.auth_token,
      http_only: true,
    )

    env.response.cookies << auth_cookie
  end

  def self.sign_out(env)
    auth_cookie = env.request.cookies["auth"]?

    if auth_cookie
      auth_cookie.expires = Time.unix(0)

      env.response.cookies << auth_cookie
    end
  end

  def self.app_root(env)
    # TODO: needs to change to https with SSL enabled,
    # or figure out to determine protocol dynamically
    "http://#{env.request.host_with_port}"
  end
end
