import React from 'react'
import ReactDice from 'react-dice-complete'


export default function DiceBox(
   {
      isRolling,
      rollAll,
      rollClass,
      reactDice,
      handleRoll,
      endTurn,
      playerButtonClass,
      playerPassText
   }
) {

return (
   <div>
       {/* <button
         className='btn btn-lg roll-btn mb-4'
         disabled={isRolling}
         onClick={rollAll}
         >Roll!</button> */}
       <div 
         className={`die-container ${rollClass} ${isRolling ? 'is-rolling' : ''}`}
         onClick={rollAll}
         >
       <ReactDice
              numDice={1}
              defaultRoll={1}
              ref={reactDice}
              rollDone={handleRoll}
              faceColor='white'
              dotColor='black'
              outline={true}
              outlineColor='black'
              dieSize={140}
              rollTime={0.8}
              dieCornerRadius={20}
              disableIndividual={true}
              
            />
        </div>
        <div>
       <button className={`btn btn-lg mt-4 pass-btn ${playerButtonClass}`} onClick={endTurn}>Pass to {playerPassText}</button>
       </div>
   </div>
)
}