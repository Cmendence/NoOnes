import React from 'react'


export default function Scoreboard({totalScores}) {

const redScore = totalScores.red || 0
const blueScore = totalScores.blue || 0


   return(
      <div className='scoreboard-container row'>
         <div className="col-2"></div>
         <div className="blue-score box col-2 text-center d-flex justify-content-center">
            <h1>{blueScore}</h1>
         </div>
         <div className="col-4"></div>
         <div className="red-score box col-2 text-center d-flex justify-content-center">
            <h1>{redScore}</h1>
         </div>
         <div className="col-2"></div>
      </div>

    
   )
}