# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: 'infumable-english@gmail.com'
  layout 'mailer'
end
