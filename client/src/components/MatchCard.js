import React from 'react';
import moment from 'moment'
import MatchResultModal from './modals/Match/MatchResultModal'
import MatchScoreModal from './modals/Match/MatchScoreModal'
import MatchDateModal from './modals/Match/MatchDateModal'
import MatchTimeModal from './modals/Match/MatchTimeModal'
import MatchRoundModal from './modals/Match/MatchRoundModal'
import MatchNotesModal from './modals/Match/MatchNotesModal'
import DeleteMatchModal from './DeleteMatchModal'
import headToHeadIcon from '../images/head-to-head.png'
import scoreboardIcon from '../images/scoreboard.png'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'

const MatchCard = (props) => {
  var matchId = parseInt(props.id)
  var currentMatch = props.currentMatch(matchId)

  const match_round_display = (match) => {
    if(match.round > 8){
      return `Round of ${match.round}`
    } else if(match.round === 8){
      return "Quarterfinal"
    } else if(match.round === 4){
      return "Semifinal"
    } else if(match.round === 2){
      return "Final"
    }
  }

  const deleteMatch = event => {
    props.deleteMatchFromDatabase(matchId)
    props.history.push(`/tournaments/${currentMatch.tournament.id}`)
  }

  if(currentMatch) {
    var tournamentMatches = props.findTournamentMatches(props.matches, currentMatch.tournament.id)

    return (
      <section id="match-card-page">
        <div className="container-fluid py-2 bg-info text-white mb-4">
          <div className="row justify-content-center">
            <div className="col-4 ml-auto px-0 d-flex justify-content-end">
              <button className="btn text-white py-0" data-toggle="modal" data-target="#matchRoundModal">
                <h1>
                  {match_round_display(currentMatch)} -
                </h1>
              </button>
            </div>
            <div className="col-4 mr-auto px-0 text-left">
              <h1>
                <NavLink className="text-white" to={`/tournaments/${currentMatch.tournament.id}`}>{currentMatch.tournament.title}</NavLink>
              </h1>
            </div>
          </div>
        </div>

        <div className="container-fluid px-0">
            <div className="row justify-content-center mt-2">
              <div className="col-md-2 mx-md-4 mx-lg-0 px-0">
                <NavLink to={`/opponents/${currentMatch.opponent.id}`} className="btn w-100 shadow-none">
                  <div className="card card-stats text-center border-0">
                    <div className="card-body">
                      <div className="row justify-content-center">
                        <div className="col-3 col-md-6 px-0 pb-0 pt-2 text-right text-md-left text-lg-center">
                          <img src={headToHeadIcon} alt="head-to-head-icon"/>
                        </div>
                        <div className="col-6 mx-0 px-0">
                          <div className="row justify-content-center mx-0">
                            <h5 className="card-title">{currentMatch.opponent.first_name} {currentMatch.opponent.last_name}</h5>
                          </div>
                          <div className="row justify-content-center mx-0">
                            <p className="card-text font-italic">vs</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavLink>
              </div>
              <div className="col-md-2 mx-md-4 mx-lg-0 px-0">
                <button className="btn w-100 shadow-none" data-toggle="modal" data-target="#matchResultModal">
                  <div className="card card-stats text-center border-0">
                    <div className="card-body">
                      <div className="row justify-content-center">
                        <div className="col-3 col-md-6 px-0 pb-0 pt-2 text-right text-md-left text-lg-right">
                          <i className="fas fa-clipboard-check fa-3x home-icon"></i>
                        </div>
                        <div className="col-6 mx-0 px-0">
                          <div className="row justify-content-center mx-0">
                            <h5 className="card-title">{currentMatch.result}</h5>
                          </div>
                          <div className="row justify-content-center mx-0">
                            <p className="card-text font-italic">Result</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
              <div className="col-md-2 mx-md-4 mx-lg-0 px-0">
                <button className="btn w-100 shadow-none" data-toggle="modal" data-target="#matchScoreModal">
                  <div className="card card-stats text-center border-0">
                    <div className="card-body">
                      <div className="row justify-content-center">
                        <div className="col-3 col-md-6 px-0 pb-0 pt-2 text-right text-md-left text-lg-center">
                          <img src={scoreboardIcon} alt="scoreboard-icon"/>
                        </div>
                        <div className="col-6 mx-0 px-0 pr-lg-1">
                          <div className="row justify-content-center mx-0">
                            <h5 className="card-title">{currentMatch.score}</h5>
                          </div>
                          <div className="row justify-content-center mx-0">
                            <p className="card-text font-italic">Score</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
              <div className="col-md-2 mx-md-4 mx-lg-0 px-0">
                <button className="btn w-100 shadow-none" data-toggle="modal" data-target="#matchDateModal">
                  <div className="card card-stats text-center border-0">
                    <div className="card-body">
                      <div className="row justify-content-center">
                        <div className="col-3 col-md-6 px-0 pb-0 pt-2 text-right text-md-left text-lg-center">
                          <i className="fas fa-calendar-day fa-3x home-icon"></i>
                        </div>
                        <div className="col-6 mx-0 px-0">
                          <div className="row justify-content-center mx-0">
                            <h5 className="card-title">{moment(currentMatch.date).format('MM/DD/YY')}</h5>
                          </div>
                          <div className="row justify-content-center mx-0">
                            <p className="card-text font-italic">Date</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
              <div className="col-md-2 mx-md-4 mx-lg-0 px-0">
                <button className="btn w-100 shadow-none" data-toggle="modal" data-target="#matchTimeModal">
                  <div className="card card-stats text-center border-0">
                    <div className="card-body">
                      <div className="row justify-content-center">
                        <div className="col-3 col-md-6 px-0 pb-0 pt-2 text-right text-md-left text-lg-center">
                          <i className="fas fa-clock fa-3x home-icon"></i>
                        </div>
                        <div className="col-6 mx-0 px-0">
                          <div className="row justify-content-center mx-0">
                            <h5 className="card-title">{moment.utc(currentMatch.time).format('hh:mm a')}</h5>
                          </div>
                          <div className="row justify-content-center mx-0">
                            <p className="card-text font-italic">Time</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
        </div>

        <div className="container-fluid">
            <div className="row mt-4">
            <button className="btn shadow-none" data-toggle="modal" data-target="#matchNotesModal">
              <div className="col">
                <h1>Notes:</h1>
              </div>
            </button>
            </div>
            <div className="row mt-1">
              <button className="btn shadow-none text-left" data-toggle="modal" data-target="#matchNotesModal">
                <div className="col">
                  {currentMatch.notes}
                </div>
              </button>
            </div>
        </div>

        <div className="container-fluid">
          <div className="row my-5 justify-content-center">
            <div className="col-md-3">
              <button className="btn btn-danger btn-block" data-toggle="modal" data-target="#deleteMatchModal">
                <i className="fas fa-trash"></i> Delete Match
              </button>
            </div>
          </div>
        </div>
          <MatchResultModal currentMatch={currentMatch} sendMatchToDatabase={props.editMatchInDatabase} matches={tournamentMatches} edit="edit"/>
          <MatchScoreModal currentMatch={currentMatch} sendMatchToDatabase={props.editMatchInDatabase} matches={tournamentMatches} edit="edit"/>
          <MatchDateModal currentMatch={currentMatch} sendMatchToDatabase={props.editMatchInDatabase} matches={tournamentMatches} edit="edit"/>
          <MatchTimeModal currentMatch={currentMatch} sendMatchToDatabase={props.editMatchInDatabase} matches={tournamentMatches} edit="edit"/>
          <MatchRoundModal currentMatch={currentMatch} sendMatchToDatabase={props.editMatchInDatabase} matches={tournamentMatches} edit="edit"/>
          <MatchNotesModal currentMatch={currentMatch} sendMatchToDatabase={props.editMatchInDatabase} matches={tournamentMatches} edit="edit"/>
          <DeleteMatchModal matchId={currentMatch.id} deleteMatch={deleteMatch} />
      </section>
    )
  } else {
    return <h3>Loading...</h3>
  }

}



export default withRouter(MatchCard)
