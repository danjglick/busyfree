class PasswordMailer < ApplicationMailer
  def password_email(user)
    @user = user
    mail(to: @user.email, subject: 'Forgot your password?')
  end
end
