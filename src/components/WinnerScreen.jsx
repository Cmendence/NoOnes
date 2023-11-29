import React from 'react'

export default function WinnerScreen({winner, restartGame}) {


   return (
   <div className='winner-container'>
     <h1 className='display-2'>{winner} Wins!</h1>
     <button className='btn-winner btn btn-primary ' onClick={restartGame}>Play Again</button>
   </div>
   )
}