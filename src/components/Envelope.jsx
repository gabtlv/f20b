import { useState } from 'react'
import bubuDudu from '../assets/bubu-dudu.png'

function Envelope({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 600);
  }

  return (
    <div className="envelope-screen" onClick={handleClick}>
      <div className="envelope">
        <div className="envelope-body"></div>
        <div className={`envelope-flap ${isOpening ? 'envelope-flap-open' : ''}`}>
          <div className="envelope-flap-line-left"></div>
          <div className="envelope-flap-line-right"></div>
        </div>
        <img className="envelope-bears" src={bubuDudu} alt="" aria-hidden="true" />
      </div>
    </div>
  );
}

export default Envelope;