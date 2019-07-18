class Api::MatchesController < ApplicationController

  def index
    @matches = current_user.matches
    render json: @matches
  end

  def create
    @match = Match.new(match_params)
    @match.user_id = current_user.id

    if @match.save
      render json: @match
    else
      render json: {
        error: "This Match Failed To Save"
      }
    end
  end

  def update
    @match = Match.find_by_id(params[:match][:id])

    if @match.update(match_params)
      render json: @match
    else
      render json: {
        error: "This Match Failed To Update"
      }
    end
  end

  def destroy
    @match = Match.find_by_id(params[:matchId])
    @match.destroy

    render json: {
      notice: "Match Successfully Deleted",
      matchId: params[:matchId]
    }
  end

  private

  def match_params
    params.require(:match).permit(:round, :result, :score, :date, :time, :notes, :tournament_id, :user_id)
  end
end
