# frozen_string_literal: true

class SourceProcessor
  def initialize(text:, source_id:, replace_existing: true)
    @text = text.to_s
    @source_id = source_id
    @replace_existing = replace_existing
  end

  def call
    source = Source.find(@source_id)
    frequencies = normalized_words.tally

    Source.transaction do
      source.terms.destroy_all if @replace_existing

      frequencies.each do |word, priority|
        if @replace_existing
          source.terms.create!(
            user: source.user,
            phrase: word,
            meaning: nil,
            priority: priority
          )
        else
          term = source.terms.find_or_initialize_by(phrase: word)
          term.user ||= source.user
          term.priority = (term.priority || 0) + priority
          term.save!
        end
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
