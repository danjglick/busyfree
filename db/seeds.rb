# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(id: 1, name: '0', password: '0')
User.create(id: 2, name: 'Frank', password: 'p')
User.create(id: 3, name: 'Dan', password: 'tot')
User.create(id: 4, name: 'Franz', password: 'cool')

# def seed_users
#   names = [
#     '0',
#     'Steve Bob',
#     'Abby Gunshabbon'
#   passwords = [
#     '1',
#   ]
#   passwords = []
#   for name in names
#     for phone in phones
#       for password in passwords
#         User.create(name: name, phone: phone, password: password)
#         names.delete(name)
#         phones.delete(phone)
#         passwords.delete(phone)
#       end
#     end
#   end
# end
#
# seed_users
