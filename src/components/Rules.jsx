import React from 'react'

export default function Rules({showRules, toggleRules}){

   return (
      <div className='rules-container'>
      <button className='btn btn-success btn-sm mb-2' onClick={toggleRules}>How to Play</button>
      { showRules && (
        <div className={`rules ${showRules ? 'shown' : ''}`}>
           <p>Click the button(or die) to roll the die. Your roll is your score. You can bank you score and pass your turn to the other 
               player, or keep rolling to get more points. If you roll a 1, you lose your current turn's points and your turn is over.
               First to 100 points wins!
           </p>
        </div>
      )

      }
      </div>
   )
}