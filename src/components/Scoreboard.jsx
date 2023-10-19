import React from 'react'


export default function Scoreboard({totalScores}) {

const redScore = totalScores.red || 0
const blueScore = totalScores.blue || 0


   return(

    
      <div className="container">
      <div className="row">
          <div className="col-6 col-lg-2 mx-auto">
              <div className="scoreboard text-center mb-3">
                  <div className="team-name">Red</div>
                  <div className="score display-6" id="home-score">{redScore}</div>
                 
              </div>
          </div>
          <div className="col-6 col-lg-2 mx-auto">
              <div className="scoreboard text-center mb-3">
                  <div className="team-name ">Blue</div>
                  <div className="score display-6" id="away-score">{blueScore}</div>
                 
              </div>
          </div>
      </div>
  </div>
   )
}