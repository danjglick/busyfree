class User < ApplicationRecord
  validates :name, presence: true
  validates :phone, presence: true, uniqueness: true
  validates :password, presence: true, uniqueness: true

  def get_connections
    is_connected = false
    my_friends_phones = self.friends.map {|friend| friend[1]}
    for you in User.all
      your_friends_phones = you.friends.map {|friend| friend[1]}
      both_free = (self.busy_or_free == "free" && you.busy_or_free == "free")
      both_friends = (my_friends_phones.include?(you.phone) && your_friends_phones.include?(self.phone))
      currently_connected = (self.connected_to == you.name || you.connected_to == self.name)
      recently_connected = (self.just_connected == you.name || you.just_connected == self.name)
      if (both_free || currently_connected) && both_friends && !recently_connected
        is_connected = true
        self.update({
          connected_to: you.name,
          busy_or_free: 'busy'
        })
      end
    end
    if is_connected == false
      self.connected_to = ''
    end
  end

  def update_busy(params)
    if params[:busyOrFree] == "free"
      self.update({
        busy_or_free: "busy",
        connected_to: ''
      })
    elsif params[:busyOrFree] == "busy"
      self.just_connected = self.connected_to
      self.update({
        busy_or_free: "free",
        connected_to: ''
      })
    end
  end

  def add_friend(params)
    for i in User.all
      phones_match = (i.phone == params[:friendToAdd])
      not_self = (i.phone != self.phone)
      not_friend = (!self.friends.any? {|friend|
        friend[1] == i.phone
      })
      if phones_match && not_self && not_friend
        newFriendsList = self.friends << [i.name, i.phone]
        self.friends = newFriendsList
      end
    end
  end

  def remove_friend(params)
    newFriendsList = self.friends.delete_if {|friend|
      friend == params[:friendToRemove]
    }
    self.friends = newFriendsList
  end
end
