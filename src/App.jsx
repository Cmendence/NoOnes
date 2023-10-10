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

    const reactDice = useRef(null);

const rollDone = (totalValue, values) => {
  console.log('individual die values array:', values);
  console.log('total dice value:', totalValue);
  handleRoll(totalValue)
}

   useEffect(() => {
     if (totalScores.red >= 20 || totalScores.blue >= 20) {
       // If any player reaches 100 points, set the winner.
       setWinner(totalScores.red >= 20 ? 'Red' : 'Blue');
       setConfetti(true)
     }
   }, [totalScores]);
 
   function handleRoll(rollResult){
      setIsRolling(true)
      if (rollResult === 1) {
        // If a 1 is rolled, reset the current turn score and switch players.
        setCurrentTurnScore(0);
        setCurrentPlayer(currentPlayer === 'red' ? 'blue' : 'red');
        setRollClass('roll-1')
        setTimeout(() => {
         setRollClass('')
         setIsRolling(false)
        }, 800);
      } else {
        // Add the roll result to the current turn score.
        setCurrentTurnScore(currentTurnScore + rollResult);
        setRollClass('')
        setIsRolling(false)
      }
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
     <div className={`game ${!winner ? `${currentPlayer}-bg` : 'winner-bg'}`}>
       <h1>No Ones!</h1>
       {winner ? (
         <>
   <div className='winner-container'>
     <h2>{winner} wins!</h2>
     <button className='btn btn-primary' onClick={restartGame}>Restart Game</button>
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
   <div className='game-containter' >
       <h4>Roll, score points, but don't roll a 1!</h4>
       <h3>{currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}'s Turn!</h3>
       <p>Red Score: {totalScores.red}</p>
       <p>Blue Score: {totalScores.blue}</p>
       <p>{currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}'s Turn Score: {currentTurnScore}</p>
       <div className={rollClass} disabled={isRolling}>
       <ReactDice
              numDice={1}
              ref={reactDice}
              rollDone={rollDone}
              faceColor='white'
              dotColor='black'
              outline={true}
              outlineColor='black'
              dieSize={140}
              rollTime={0.8}
              dieCornerRadius={20}
              disableIndividual={isRolling}
            />
        </div>
       <div>
       <button className='btn btn-success btn-lg mt-4' onClick={endTurn}>End Turn</button>
       </div>
     </div>
       )}
     </div>


   );
}

export default App
