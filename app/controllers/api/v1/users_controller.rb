class Api::V1::UsersController < ApplicationController
  protect_from_forgery unless: -> {request.format.json?}

  def show
    user = User.find(params[:id])
    user.get_connections
    render json: user
  end

  def update
    user = User.find(params[:id])
    if params.key?(:selectedFriend)
      user.update_friends(params)
    elsif params.key?(:busyOrFree)
      user.update_busy(params)
    end
    user.save
    render json: user
  end
end
