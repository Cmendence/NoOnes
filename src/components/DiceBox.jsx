import React from 'react'
import ReactDice from 'react-dice-complete'
import PropTypes, { bool, func, object, string } from 'prop-types'


export default function DiceBox(
   {
      isRolling,
      rollAll,
      rollClass,
      reactDice,
      handleRoll,
      endTurn,
      playerButtonClass,
      playerPassText,
      declareWinner
}
   
) {


   DiceBox.propTypes = {
      isRolling: bool,
         rollAll: func,
         rollClass: string,
         reactDice: object,
         handleRoll: func,
         endTurn:func,
         playerButtonClass: string,
         playerPassText: string,
         declareWinner: string
   }

return (
   <div>
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
       <button className={`btn btn-lg mt-4 pass-btn ${!declareWinner ? playerButtonClass : declareWinner}`} onClick={endTurn}>
         {declareWinner? "END GAME" : `Pass to ${playerPassText}`}</button>
       </div>
   </div>
)
}
