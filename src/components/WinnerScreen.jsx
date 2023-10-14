import React from 'react'

export default function WinnerScreen({winner, restartGame}) {


   return (
   <div className='winner-container'>
     <h2>{winner} wins!</h2>
     <button className='btn btn-primary' onClick={restartGame}>Play Again</button>
   </div>
   )
}