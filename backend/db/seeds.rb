# frozen_string_literal: true

# User
user = User.create_with(username: 'Mary Poppins', password: 'password').find_or_create_by(email: 'user@example.com')

# Source
source = user.sources.create_with(
  title: 'My Source',
  is_public: true
).find_or_create_by(title: 'My Source')

# Terms
user.terms.create_with(phrase: 'Laptop', source: source).find_or_create_by(meaning: 'Ноутбук')
user.terms.create_with(phrase: 'App', source: source).find_or_create_by(meaning: 'Додаток')
user.terms.create_with(phrase: 'Sofa', source: source).find_or_create_by(meaning: 'Ліжко')
user.terms.create_with(phrase: 'Meat', source: source, learnt: true).find_or_create_by(meaning: 'Мясо')

p 'Success seed'
