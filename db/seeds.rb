# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(id: 1, name: '0', phone: '0', password: '0')
User.create(id: 2, name: 'Frank', phone: 1, password: 'p')

# def seed_users
#   names = [
#     'Jerry Moon',
#     'Steve Bob',
#     'Abby Gunshabbon',
#     'Kevin Uke',
#     'Maureen Gosling',
#     'Debbie Wu',
#     'Danielle Stevens',
#     'Daniel Smith',
#     'Dan Golden',
#     'Abigail Wong'
#   phones = [
#     '1'
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
