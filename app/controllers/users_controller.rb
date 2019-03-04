class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def new
    @error_name
    @error_phone
    @error_password
  end

  def create
    user = User.create(
      name: params[:user][:name],
      phone: params[:user][:phone],
      password: params[:user][:password]
    )
    if user.save
      redirect_to user
    else
      @error_name = user.errors.messages[:name].join('')
      @error_phone = user.errors.messages[:phone].join('')
      @error_password = user.errors.messages[:password].join('')
      render :new
    end
  end

  def show
  end

  def edit
  end
end
