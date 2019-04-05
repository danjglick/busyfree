class User < ApplicationRecord
  validates :name, presence: true
  validates :password, presence: true, uniqueness: true

  def get_connections
    is_connected = false
    my_friends_ids = self.friends.map {|friend| friend['id']}
    for you in User.all
      your_friends_ids = you.friends.map {|friend| friend['id']}
      both_free = (self.busy_or_free == "free" && you.busy_or_free == "free")
      both_friends = (my_friends_ids.include?(you.id) && your_friends_ids.include?(self.id))
      both_connected_to_noone = (self.connected_to == '' && you.connected_to = '')
      both_connected_to_eachother = (self.connected_to == you.name && you.connected_to == self.name)
      if you != self && both_free && both_friends && (both_connected_to_noone || both_connected_to_eachother)
        is_connected = true
        self.connected_to = you.name
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
      self.update({
        busy_or_free: "free",
        connected_to: ''
      })
    end
  end

  def add_friend(params)
    if self.id != 1
      for i in User.all
        in_db = (i.id == params[:friendToAdd][:id])
        not_self = (i.id != self.id)
        not_friend = (!self.friends.any? {|friend|
          i.id == friend['id']
        })
        if in_db && not_self && not_friend
          self.friends << ({name: i.name, id: i.id})
        end
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
