class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def new
  end

  def create
    user = User.create(
      name: params[:user][:name],
      phone: params[:user][:phone],
      password: params[:user][:password]
    )
    redirect_to user
  end

  def show
  end

  def edit
  end
end
