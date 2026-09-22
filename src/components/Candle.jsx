import '../style.css'

function Candle({ isLit }) {
  return (
    <div className="candle">
      {isLit && <div className="candle-flame"></div>}
      <div className="candle-stick"></div>
    </div>
  );
}

export default Candle;