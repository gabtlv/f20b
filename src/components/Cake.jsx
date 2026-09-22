import "../style.css";
import Candle from './Candle.jsx'
import { useBlowDetector } from '../hooks/useBlowDetector'

function Cake({ candlesLit, onBlow }) {
    useBlowDetector(onBlow, true);

    return (
        <div className="cake-screen">
            <div className="cake">
                <div className="cake-candles">
                    {candlesLit.map((isLit, index) => (
                        <Candle key={index} isLit={isLit} />
                    ))}
                </div>
                <div className="cake-top">
                    <div className="cake-top-icing"></div>
                </div>
                <div className="cake-bottom">
                    <div className="cake-bottom-band"></div>
                </div>
                <div className="cake-shadow"></div>
            </div>
        </div>
    );
}
export default Cake;