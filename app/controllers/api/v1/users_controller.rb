class Api::V1::UsersController < ApplicationController
  protect_from_forgery unless: -> {request.format.json?}

  def show
    user = User.find(params[:id])
    Api::V1::UsersController.get_connections(user)
    render json: user
  end

  def self.get_connections(user)
    connected = false
    for i in User.all
      should_connect = (
        user.busy_or_free == "free" &&
        i.busy_or_free == "free" &&
        user.friends.include?(i.name) &&
        i.friends.include?(user.name)
      )
      currently_connected = (i.connected_to == user.name)
      recently_connected = (
        i.name == user.just_connected ||
        i.just_connected == user.name
      )
      if (should_connect || currently_connected) && !recently_connected
        connected = true
        user.update({
          connected_to: i.name,
          busy_or_free: 'busy'
        })
      end
    end
    if connected == false
      user.connected_to = ''
    end
  end

  def update
    user = User.find(params[:id])
    if params.key?(:selectedFriend)
      Api::V1::UsersController.update_friends(user, params)
    elsif params.key?(:busyOrFree)
      Api::V1::UsersController.update_busy(user, params)
    end
    user.save
    render json: user
  end

  def self.update_friends(user, params)
    if user.friends.any? {|i| i == params[:selectedFriend]}
      user.friends.delete(params[:selectedFriend])
      user.connected_to = ''
    else
      for i in User.all
        if(
          i.name == params[:selectedFriend] &&
          i.name != user.name
        )
          newFriendsList = user.friends << params[:selectedFriend]
          user.update(friends: newFriendsList)
        end
      end
    end
  end

  def self.update_busy(user, params)
    if params[:busyOrFree] == "free"
      user.update({
        busy_or_free: "busy",
        connected_to: ''
      })
    elsif params[:busyOrFree] == "busy"
      user.just_connected = user.connected_to
      user.update({
        busy_or_free: "free",
        connected_to: ''
      })
    end
  end
end
