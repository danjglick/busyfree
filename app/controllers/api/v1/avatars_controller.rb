class Api::V1::AvatarsController < ApplicationController
  protect_from_forgery unless: -> {request.format.json?}
  skip_before_action :verify_authenticity_token

  def create
    avatar = Avatar.create!(
      user_id: params['user_id'],
      content_type: params['uploaded_image'].content_type,
      headers: params['uploaded_image'].headers,
      original_filename: params['uploaded_image'].original_filename,
      tempfile: params['uploaded_image'].tempfile
    )
    render json: Avatar.all
    binding.pry
  end

  def index
    render json: Avatar.all
  end
end
