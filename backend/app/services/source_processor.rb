# frozen_string_literal: true

class SourceProcessor
  def initialize(text:, source_id:)
    @text = text.to_s
    @source_id = source_id
  end

  def call
    source = Source.find(@source_id)
    frequencies = normalized_words.tally

    Source.transaction do
      frequencies.each do |word, priority|
        term = source.terms.find_or_initialize_by(phrase: word)
        term.user ||= source.user
        term.priority = if term.persisted?
                          term.priority.to_i + priority
        else
                          priority
        end
        term.save!
      end
    end
  end

  private

  def normalized_words
    @text
      .downcase
      .scan(/\p{L}+/)
      .map(&:singularize)
      .reject(&:blank?)
  end
end
