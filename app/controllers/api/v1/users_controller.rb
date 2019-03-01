class Api::V1::UsersController < ApplicationController
  protect_from_forgery unless: -> {request.format.json?}

  def show
    user = User.find(params[:id])
    if user.busy_or_free == "free"
      Api::V1::UsersController.get_connections(user)
    end
    render json: user
  end

  def self.get_connections(user)
    for i in User.all
      if i.friends.include?(user.name) &&
      user.friends.include?(i.name) &&
      (i.busy_or_free == "free" ||
      i.connected_to == user.name)
        user.update({
          connected_to: i.name,
          busy_or_free: 'busy'
        })
      end
    end
  end

  def update
    user = User.find(params[:id])
    if params.key?(:addedFriend)
      Api::V1::UsersController.add_friend(user, params)
    elsif params.key?(:busyOrFree)
      Api::V1::UsersController.busy_switch(user, params)
    end
    render json: user
  end

  def self.add_friend(user, params)
    if User.all.any? {|i| i.name == params[:addedFriend]}
      newFriendsList = user.friends << params[:addedFriend]
      user.update(friends: newFriendsList)
    end
  end

  def self.busy_switch(user, params)
    if params[:busyOrFree] == "free"
      user.update({
        busy_or_free: "busy",
        connected_to: ''
      })
    elsif params[:busyOrFree] == "busy"
      user.update({
        busy_or_free: "free",
        connected_to: ''
      })
    end
  end
end
