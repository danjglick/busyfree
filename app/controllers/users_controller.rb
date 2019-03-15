class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def new
    @user = User.new
    @is_error
  end

  def show
  end

  def edit
  end

  def create
    if self.signin(params)
      redirect_to @user
    elsif self.signup(params)
      redirect_to @user
    else
      @is_error = true
      render :new
    end
  end

  def signin(params)
    bool = false
    if params[:commit] == "Sign In"
      for i in User.all
        names_match = (i.name == params[:user][:name])
        phones_match = (i.phone == params[:user][:phone])
        passwords_match = (i.password == params[:user][:password])
        if (names_match || phones_match) && passwords_match
          bool = true
          @user = i
        end
      end
    end
    return bool
  end

  def signup(params)
    bool = false
    if params[:commit] == "Sign Up"
      form_inputs = {
        name: params[:user][:name],
        phone: params[:user][:phone],
        password: params[:user][:password]
      }
      @user = User.new(form_inputs)
      if @user.save
        bool = true
      end
    end
    return bool
  end
end
