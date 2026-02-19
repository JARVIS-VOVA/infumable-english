# frozen_string_literal: true

class TermBlueprint < Blueprinter::Base
  identifier :id

  fields :phrase, :meaning, :priority, :source_id, :learnt
end
