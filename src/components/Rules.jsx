import React from 'react'

export default function Rules({showRules, toggleRules}){

   return (
      <div className='rules-container'>
      <button className='btn btn-success btn-sm' onClick={toggleRules}>How to Play</button>
      { showRules && (
        <div className={`rules ${showRules ? 'shown' : ''}`}>
           <p>GAME RULES</p>
        </div>
      )

      }
      </div>
   )
}