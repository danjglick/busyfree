class User < ApplicationRecord
  validates :name, presence: true
  validates :phone, presence: true, uniqueness: true
  validates :password, presence: true

  def get_connections
    connected = false
    my_friends_names = []
    for i in self.friends
      my_friends_names << i[0]
    end
    for you in User.all
      your_friends_names = []
      for i in you.friends
        your_friends_names << i[0]
      end
      should_connect = (self.busy_or_free == "free" && you.busy_or_free == "free" && my_friends_names.include?(you.name) && your_friends_names.include?(self.name))
      # currently_connected = (self.connected_to == you.name)
      recently_connected = (you.name == self.just_connected || you.just_connected == self.name)
      # if (should_connect || currently_connected) && !recently_connected
      if should_connect && !recently_connected
        connected = true
        self.update({connected_to: you.name, busy_or_free: 'busy'})
      end
    end
    if connected == false
      self.connected_to = ''
    end
  end

  def switch_busy(params)
    if params[:busyOrFree] == "free"
      self.update({busy_or_free: "busy", connected_to: ''})
    elsif params[:busyOrFree] == "busy"
      self.just_connected = self.connected_to
      self.update({busy_or_free: "free", connected_to: ''})
    end
  end

  def add_friend(params)
    for i in User.all
      if i.name == params[:friendToAdd] && i.name != self.name
        newFriendsList = self.friends << [i.name, i.phone]
        self.update(friends: newFriendsList)
      end
    end
  end

  def remove_friend(params)
    newFriendsList = self.friends.delete_if {|friend| friend == params[:friendToRemove]}
    self.update(friends: newFriendsList)
  end
end
