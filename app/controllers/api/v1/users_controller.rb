class Api::V1::UsersController < ApplicationController
  protect_from_forgery unless: -> {request.format.json?}

  def create
    user = User.new(
      id: User.maximum(:id).next,
      name: params[:name],
      password: params[:password]
    )
    if user.save
      render json: user
    end
  end

  def index
    render json: User.all
  end

  def show
    user = User.find(params[:id])
    user.get_connections
    render json: user
  end

  def update
    user = User.find(params[:id])
    if params.key?(:busyOrFree)
      user.update_busy(params)
    elsif params.key?(:friendToAdd)
      user.add_friend(params)
    elsif params.key?(:friendToRemove)
      user.remove_friend(params)
    end
    user.save
    render json: user
  end
end
