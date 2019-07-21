class ApplicationController < ActionController::API
    def index
        user=User.find(1)
        render json:{data:{name:user.name,image:url_for(user.image)}},status: :ok
    end

    def save
        user=User.find_or_create_by(id:1)

        user[:name]=params[:name]
        user[:image]=params[:image]
        user.save!
        user.image.attach(params[:image])
        
        render json:{data:{name:user.name,image:url_for(user.image)}},status: :ok
    end
end
