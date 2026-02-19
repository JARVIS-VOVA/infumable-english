# frozen_string_literal: true

class SourceBlueprint < Blueprinter::Base
  identifier :id

  fields :title, :is_public, :user_id, :created_at, :updated_at

  field :author_username do |source, _options|
    source.user.username
  end

  field :terms_count do |source, _options|
    source.terms.size
  end

  view :with_terms do
    association :terms, blueprint: TermBlueprint do |source, _options|
      source.terms.order(priority: :desc, phrase: :asc)
    end
  end
end
