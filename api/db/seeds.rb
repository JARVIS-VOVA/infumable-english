# frozen_string_literal: true

# User
user = User.create_with(username: 'Mary Poppins', password: 'password').find_or_create_by(email: 'user@example.com')

# Terms
laptop_term = user.terms.create_with(phrase: 'Laptop').find_or_create_by(meaning: 'Ноутбук')
meat_term = user.terms.create_with(phrase: 'Meat').find_or_create_by(meaning: 'Мясо')
app_term = user.terms.create_with(phrase: 'App').find_or_create_by(meaning: 'Додаток')
sofa_term = user.terms.create_with(phrase: 'Sofa').find_or_create_by(meaning: 'Ліжко')

# Tag
web_tag = user.tags.create_with(color: '#0065FF').find_or_create_by(title: 'web')
it_tag = user.tags.create_with(color: 'red').find_or_create_by(title: 'it')
food_tag = user.tags.create_with(color: 'green').find_or_create_by(title: 'food')

# TermTags
user.term_tags.find_or_create_by(term_id: laptop_term.id, tag_id: web_tag.id)
user.term_tags.find_or_create_by(term_id: laptop_term.id, tag_id: it_tag.id)
user.term_tags.find_or_create_by(term_id: app_term.id, tag_id: web_tag.id)
user.term_tags.find_or_create_by(term_id: app_term.id, tag_id: it_tag.id)
user.term_tags.find_or_create_by(term_id: meat_term.id, tag_id: food_tag.id)

p 'Success seed'
