Rails.application.config.session_store :cookie_store,
  key: 'session_key',
  domain: :all,
  same_site: :none,
  secure: Rails.env.production?
