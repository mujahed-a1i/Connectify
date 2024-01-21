class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']
  before_action :require_logged_out, only: [:create]

  def create
    
    @user = User.new(user_params)
    @user.valid?
    if @user.save
        login!(@user)
        render :show
    else
        render json: {errors: @user.errors.full_messages}  , status: 422
    end
  end

  def index
    @users = User.all
    render :index
  end

  def show
    @user = User.find(params[:id])
    if @user
      render :show
    else
      render json: {errors: @user.errors.full_messages}  , status: 404
    end
  end

    private
    def user_params
        params.require(:user).permit(:email, :username, :password, :first_name, :last_name)
    end
end
