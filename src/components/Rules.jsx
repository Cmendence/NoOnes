import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

export default function Rules() {

  const popover = (
   <Popover id="popover-basic">
     <Popover.Header as="h3">Game Rules</Popover.Header>
     <Popover.Body>
         Click the die to roll. Accumulate points by rolling, pass to bank
         your points, but if you roll a 1 you lose your turn's points and
         your turn. First to 50 wins.
     </Popover.Body>
   </Popover>
 );
 
 const GameRules = () => (
   <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
     <Button className="btn-rules mb-2" variant="dark">How to Play</Button>
   </OverlayTrigger>
 );
 

  return (
   
   <>

<GameRules />
   
 </>
  );
}