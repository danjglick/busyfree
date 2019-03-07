class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def new
    @error
  end

  def show
  end

  def edit
  end

  def create
    if UsersController.signin(params)
      redirect_to @@user
    elsif UsersController.signup(params)
      redirect_to @@user
    else
      @error = 'Try again. For sign-in: name or phone must be populated, password must be populated, and all input must match our records. For sign-up: all fields must be populated, and password must be unique.'
      render :new
    end
  end

  def self.signin(params)
    bool = false
    if params[:commit] == "Sign In"
      for i in User.all
        if (i.name == params[:user][:name] || i.phone == params[:user][:phone]) && i.password == params[:user][:password]
          bool = true
          @@user = i
        end
      end
    end
    return bool
  end

  def self.signup(params)
    bool = false
    if params[:commit] == "Sign Up"
      form_inputs = {name: params[:user][:name], phone: params[:user][:phone], password: params[:user][:password]}
      @@user = User.new(form_inputs)
      if @@user.save
        bool = true
      end
    end
    return bool
  end
end
