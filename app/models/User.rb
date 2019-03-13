class User < ApplicationRecord
  validates :name, presence: true
  validates :phone, presence: true, uniqueness: true
  validates :password, presence: true, uniqueness: true

  def get_connections
    connected = false
    my_friends_names = self.friends.map {|friend| friend[0]}
    for you in User.all
      your_friends_names = you.friends.map {|friend| friend[0]}
      both_free = (self.busy_or_free == "free" && you.busy_or_free == "free")
      both_friends = (my_friends_names.include?(you.name) && your_friends_names.include?(self.name))
      currently_connected = (self.connected_to == you.name || you.connected_to == self.name)
      recently_connected = (self.just_connected == you.name || you.just_connected == self.name)
      if (both_free || currently_connected) && both_friends && !recently_connected
        connected = true
        self.update({connected_to: you.name, busy_or_free: 'busy'})
      end
    end
    if connected == false
      self.update({connected_to: ''})
    end
  end

  def update_busy(params)
    if params[:busyOrFree] == "free"
      self.update({busy_or_free: "busy", connected_to: ''})
    elsif params[:busyOrFree] == "busy"
      self.update({just_connected: self.connected_to})
      self.update({busy_or_free: "free", connected_to: ''})
    end
  end

  def add_friend(params)
    for i in User.all
      if (i.name.casecmp(params[:friendToAdd]) == 0 || i.phone == params[:friendToAdd]) && i.phone != self.phone && !self.friends.any? {|friend| friend[1] == i.phone}
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
