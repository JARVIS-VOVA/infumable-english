# frozen_string_literal: true

User.create_with(username: 'Mary Poppins', password: 'password').find_or_create_by(email: 'user@example.com')

p 'Success seed'
