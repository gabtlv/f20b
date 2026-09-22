import { useState, useEffect, useCallback } from 'react'
import './style.css'
import Countdown from './components/Countdown'
import Envelope from './components/Envelope'
import NoteCard from './components/NoteCard'
import Gallery from './components/Gallery'
import Cake from './components/Cake'

const BIRTHDAY = new Date('2026-09-24T00:00:00');
//const BIRTHDAY = new Date(Date.now() + 3000);

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(BIRTHDAY - new Date());
  const [noteIndex, setNoteIndex] = useState(0);
  const [candlesLit, setCandlesLit] = useState(Array(20).fill(true));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(BIRTHDAY - new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleBlow = useCallback(() => {
    setCandlesLit((prev) => {
      const nextIndex = prev.findIndex((isLit) => isLit);
      if (nextIndex === -1) return prev;
      const updated = [...prev];
      updated[nextIndex] = false;
      return updated;
    });
  }, []);

  const isComplete = timeLeft <= 0;
  const totalSeconds = Math.max(0, Math.floor(timeLeft / 1000));
  const allCandleOut = candlesLit.every((isLit) => !isLit);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (!isComplete) {
    return (
      <Countdown days={days} hours={hours} minutes={minutes} seconds={seconds}/>
    );
  }

  if (!isOpen) {
    return (
      <Envelope onOpen={() => setIsOpen(true)}/>
    );
  }

  if (!allCandleOut) {
    return (
      <Cake candlesLit={candlesLit} onBlow={handleBlow}/>
    )
  }
  const photos = [
    { src: "", caption: "first date" },
    { src: "", caption: "first valentines" }
  ]
  const notes = [
    "hi dovey",
    "yo gurt"
  ]

  return (
    <div className="final-screen">
      <h1>Happy Birthday!</h1>
      <NoteCard
        note={notes[noteIndex]}
        hasNext={noteIndex < notes.length - 1}
        onNext={() => setNoteIndex(noteIndex + 1)}
      />
      <Gallery photos={photos}/>
      <div className="bear-duo" aria-hidden="true">
        <div className="bear bear-bubu">
          <span className="bear-arm bear-arm-left"></span>
          <span className="bear-arm bear-arm-right"></span>
          <span className="bear-leg bear-leg-left"></span>
          <span className="bear-leg bear-leg-right"></span>
          <span className="bear-body"></span>
          <span className="bear-ear bear-ear-left"></span>
          <span className="bear-ear bear-ear-right"></span>
          <span className="bear-head">
            <span className="bear-eye bear-eye-left"></span>
            <span className="bear-eye bear-eye-right"></span>
            <span className="bear-cheek bear-cheek-left"></span>
            <span className="bear-cheek bear-cheek-right"></span>
            <span className="bear-mouth">
              <span className="bear-tongue"></span>
            </span>
          </span>
        </div>
        <div className="bear-heart"></div>
        <div className="bear bear-dudu">
          <span className="bear-arm bear-arm-left"></span>
          <span className="bear-arm bear-arm-right"></span>
          <span className="bear-leg bear-leg-left"></span>
          <span className="bear-leg bear-leg-right"></span>
          <span className="bear-body"></span>
          <span className="bear-ear bear-ear-left"></span>
          <span className="bear-ear bear-ear-right"></span>
          <span className="bear-head">
            <span className="bear-eye bear-eye-left"></span>
            <span className="bear-eye bear-eye-right"></span>
            <span className="bear-cheek bear-cheek-left"></span>
            <span className="bear-cheek bear-cheek-right"></span>
            <span className="bear-mouth">
              <span className="bear-tongue"></span>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;