# frozen_string_literal: true

# User
user = User.create_with(username: 'Mary Poppins', password: 'password').find_or_create_by(email: 'user@example.com')

# Card
laptop_card = user.cards.create_with(origin: 'Laptop').find_or_create_by(translate: 'Ноутбук')
meat_card = user.cards.create_with(origin: 'Meat').find_or_create_by(translate: 'Мясо')
sofa_card = user.cards.create_with(origin: 'Sofa').find_or_create_by(translate: 'Ліжко')

# Tag
web_tag = user.tags.create_with(color: '#0065FF').find_or_create_by(title: 'web')
it_tag = user.tags.create_with(color: '#095bd8').find_or_create_by(title: 'it')
food_tag = user.tags.create_with(color: 'green').find_or_create_by(title: 'food')

# CardsTag
user.cards_tags.find_or_create_by(card_id: laptop_card.id, tag_id: web_tag.id)
user.cards_tags.find_or_create_by(card_id: laptop_card.id, tag_id: it_tag.id)
user.cards_tags.find_or_create_by(card_id: meat_card.id, tag_id: food_tag.id)

p 'Success seed'
