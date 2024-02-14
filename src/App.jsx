import { useState, useEffect, useRef } from 'react'

import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import Confetti from 'react-confetti'
import WinnerScreen from './components/WinnerScreen'
import DiceBox from './components/DiceBox'
import Scoreboard from './components/Scoreboard'
import Rules from './components/Rules'


function App() {

   const [currentPlayer, setCurrentPlayer] = useState('blue');
    const [currentTurnScore, setCurrentTurnScore] = useState(0);
    const [totalScores, setTotalScores] = useState({ red: 0, blue: 0 });
    const [winner, setWinner] = useState(null);
    const [rollClass, setRollClass] = useState('')
    const [isRolling, setIsRolling] = useState(false)
    const [confetti, setConfetti] = useState(false)

   //  const declareWinner = totalScores[currentPlayer] + currentTurnScore

    const declareWinner = totalScores[currentPlayer] + currentTurnScore >=50 ? 
    ( "btn-success p-4"): ("")

    const reactDice = useRef(null);
    const playerButtonClass = currentPlayer === 'red' ? 'btn-primary' : 'btn-danger'
    const playerPassText = currentPlayer === 'red' ? 'Blue' : 'Red'

   useEffect(() => {
     if (totalScores.red >= 50 || totalScores.blue >= 50) {
       // If any player reaches 50 points, set the winner.
       setWinner(totalScores.red >= 50 ? 'Red' : 'Blue');
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
     <div className={`game ${!winner ? `${currentPlayer}-bg` : "winner-bg"}`}>


       {winner ? (
         <>
           <WinnerScreen winner={winner} restartGame={restartGame} />
           {confetti && (
             <Confetti
             width={window.innerWidth}
             height={window.innerHeight}
             numberOfPieces={200}
             />
             )}
         </>
       ) : (
          <div className={`game-containter ${isRolling ? "is-rolling" : ""}`}>
            <h1>No Ones!</h1>
       
       <Rules />
           <h3>
             {currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}&apos;s
             Turn!
           </h3>
           <Scoreboard totalScores={totalScores} />
           <h4>
             {currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}&apos;s
             Turn Score:
           </h4>
           <h5 className='display-3 mb-3 fw-bold'>{currentTurnScore}</h5>

           <DiceBox
             isRolling={isRolling}
             rollAll={rollAll}
             rollClass={rollClass}
             reactDice={reactDice}
             handleRoll={handleRoll}
             endTurn={endTurn}
             playerButtonClass={playerButtonClass}
             playerPassText={playerPassText}
             declareWinner={declareWinner}
           />
         </div>
       )}
     </div>
   );
}

export default App
