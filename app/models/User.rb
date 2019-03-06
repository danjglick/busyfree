class User < ApplicationRecord
  validates :name, presence: true
  validates :phone, presence: true, uniqueness: true
  validates :password, presence: true, uniqueness: true

  def get_connections
    connected = false
    for i in User.all
      should_connect = (self.busy_or_free == "free" && i.busy_or_free == "free" && self.friends.include?(i.name) && i.friends.include?(self.name))
      currently_connected = (self.connected_to == i.name || i.connected_to == self.name)
      recently_connected = (i.name == self.just_connected || i.just_connected == self.name)
      if (should_connect || currently_connected) && !recently_connected
        connected = true
        self.update({connected_to: i.name, busy_or_free: 'busy'})
      end
    end
    if connected == false
      self.connected_to = ''
    end
  end

  def update_friends(params)
    if self.friends.any? {|i| i == params[:selectedFriend]}
      self.friends.delete(params[:selectedFriend])
      self.connected_to = ''
    else
      for i in User.all
        if i.name == params[:selectedFriend] && i.name != self.name
          newFriendsList = self.friends << params[:selectedFriend]
          self.update(friends: newFriendsList)
        end
      end
    end
  end

  def update_busy(params)
    if params[:busyOrFree] == "free"
      self.update({busy_or_free: "busy", connected_to: ''})
    elsif params[:busyOrFree] == "busy"
      self.just_connected = self.connected_to
      self.update({busy_or_free: "free", connected_to: ''})
    end
  end
end
