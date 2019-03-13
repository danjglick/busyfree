BusyFree ToDo

————————

FEATURES

delete search my phone feature
simply show users that match search params above like 3 characters

Root: home page
Signin/up form to settings page
default :id in url to 0, which triggers prompts to signup

Forgot password
Popup window asks for email address

Refactor css.
Make it flex.
Divide it into stylesheets
Make it look how it does when zoomed in as much as possible
Inline styling out of busyswitch.js

User validations
Maybe Do some on front end to prevent unnecessary db queries

Duplicate name
If duplicate, prompt to search by phone

collapsing settings

Edit account info

I’m not home right now but i think you should have yarn install in your post install script
And have your node_modules in your .gitignore
—————————

REFACTOR

Create my own controller actions
lunch academy
new.html.erb is too coupled with users_controller.rb via the former’s User.new and the latter’s params[:commit]

Fix constant db queries
get_connections only runs when home page is up, and then it updates the db constantly

————————

FUTURE

Groups

Activities

chat

Swiping through friends

Ads

Dating

Deals (bulk delivery orders?)

Events

videoGames
