import '../style.css'

function Countdown({ days, hours, minutes, seconds }) {
  return (
    <div className="countdown">
      <div className="countdown-unit">
        <span className="countdown-number" key={days}>{days}</span>
        <span className="countdown-label">days</span>
      </div>
      <span className="countdown-colon">:</span>
      <div className="countdown-unit">
        <span className="countdown-number" key={hours}>{hours}</span>
        <span className="countdown-label">hours</span>
      </div>
      <span className="countdown-colon">:</span>
      <div className="countdown-unit">
        <span className="countdown-number" key={minutes}>{minutes}</span>
        <span className="countdown-label">minutes</span>
      </div>
      <span className="countdown-colon">:</span>
      <div className="countdown-unit">
        <span className="countdown-number" key={seconds}>{seconds}</span>
        <span className="countdown-label">seconds</span>
      </div>
    </div>
  );
}

export default Countdown;
