# frozen_string_literal: true

class UserBlueprint < Blueprinter::Base
  identifier :id

  fields :email, :username
end
