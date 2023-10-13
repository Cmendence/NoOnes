import { useState, useEffect, useRef } from 'react'
import ReactDice, {ReactDiceRef} from 'react-dice-complete'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import Confetti from 'react-confetti'


function App() {

   const [currentPlayer, setCurrentPlayer] = useState('red');
    const [currentTurnScore, setCurrentTurnScore] = useState(0);
    const [totalScores, setTotalScores] = useState({ red: 0, blue: 0 });
    const [winner, setWinner] = useState(null);
    const [rollClass, setRollClass] = useState('')
    const [isRolling, setIsRolling] = useState(false)
    const [confetti, setConfetti] = useState(false)
    const [isGameStarted, setIsGameStarted] = useState(false)

    const reactDice = useRef(null);
    const playerButtonClass = currentPlayer === 'red' ? 'btn-primary' : 'btn-danger'
    const playerPassText = currentPlayer === 'red' ? 'Blue' : 'Red'

   useEffect(() => {
     if (totalScores.red >= 100 || totalScores.blue >= 100) {
       // If any player reaches 100 points, set the winner.
       setWinner(totalScores.red >= 100 ? 'Red' : 'Blue');
       setConfetti(true)
     }
   }, [totalScores]);
 
   function handleRoll(totalValue){
      if (totalValue === 1) {
        // If a 1 is rolled, reset the current turn score and switch players.
        setCurrentTurnScore(0);
        setCurrentPlayer(currentPlayer === 'red' ? 'blue' : 'red');
        setRollClass('roll-1')
        setTimeout(() => {
         setRollClass('')
        }, 800);
      } else {
        // Add the roll result to the current turn score.
        setCurrentTurnScore(currentTurnScore + totalValue);
        setRollClass('')
      }
    }
 
    function rollAll() {
      setIsRolling(true)
      reactDice.current?.rollAll()
      setTimeout(() => {
         setIsRolling(false)
      }, 800);
    }

   function endTurn() {
     // Add the current turn score to the total score of the current player.
     setTotalScores({
       ...totalScores,
       [currentPlayer]: totalScores[currentPlayer] + currentTurnScore,
     });
 
     // Reset the current turn score and switch players.
     setCurrentTurnScore(0);
     setCurrentPlayer( currentPlayer === 'red' ? 'blue' : 'red');
   
   }

   function restartGame() {
      // Reset all game states to start a new game.
      setCurrentPlayer('red');
      setCurrentTurnScore(0);
      setTotalScores({ red: 0, blue: 0 });
      setWinner(null);
      setConfetti(false);
    }

   return (
     <div 
     className={`game ${!winner ? `${currentPlayer}-bg` : 'winner-bg'}`}>
       <h1>No Ones!</h1>
       {winner ? (
         <>
   <div className='winner-container'>
     <h2>{winner} wins!</h2>
     <button className='btn btn-primary' onClick={restartGame}>Play Again</button>
   </div>
   {confetti && (
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={200}
      />
    )}
     </>
 ) : (
   <div className={`game-containter ${isRolling ? 'is-rolling' : ''}`} >
       <h4>Roll, score points, but don't roll a 1!</h4>
       <h3>{currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}'s Turn!</h3>
       <p>Red Score: {totalScores.red}</p>
       <p>Blue Score: {totalScores.blue}</p>
       <p>{currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}'s Turn Score: {currentTurnScore}</p>
         <button
         className='btn btn-lg roll-btn mb-4'
         disabled={isRolling}
         onClick={rollAll}
         >Roll!</button>
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
       )}
     </div>


   );
}

export default App
