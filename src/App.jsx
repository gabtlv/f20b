import { useState, useEffect, useCallback } from 'react'
import './style.css'
import Countdown from './components/Countdown'
import Envelope from './components/Envelope'
import NoteCard from './components/NoteCard'
import Gallery from './components/Gallery'
import Cake from './components/Cake'
import Music from './components/Music'
import DancingCats from './components/DancingCats'

const BIRTHDAY = new Date('2026-09-23T22:25:00');
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
    { src: "/photos/firstdate.jpg", caption: "first date" },
    { src: "/photos/firstphotobooth.jpg", caption: "first photobooth" },
    { src: "/photos/faithandjj.jpg", caption: "faith and jj" },
    { src: "/photos/faithandspidey.jpg", caption: "faith and spidey" },
    { src: "/photos/gurtdate.jpg", caption: "gurt date" },
    { src: "/photos/cactusclurb.jpg", caption: "cactus club" },
    { src: "/photos/bruno.jpg", caption: "bruno mars" },
    { src: "/photos/afterexams.jpg", caption: "after exams" },
    { src: "/photos/valentines.jpg", caption: "valentines" },
    { src: "/photos/flowersvalentines.jpg", caption: "flowers for valentines" },
    { src: "/photos/hotpot.jpg", caption: "hotpot" },
    { src: "/photos/climbingdate.jpg", caption: "climbing date" },
    { src: "/photos/akaza.jpg", caption: "akaza" },
    { src: "/photos/mybirthday.jpg", caption: "my birthday" },
    { src: "/photos/towel.jpg", caption: "towel" },
    { src: "/photos/ishowdovey.jpg", caption: "ishowdovey" },
    { src: "/photos/67.jpg", caption: "67" },
    { src: "/photos/afterexamsphotoboof.jpg", caption: "after exams photobooth" },
    { src: "/photos/medicinewheel.jpg", caption: "medicine wheel" },
    { src: "/photos/tteokbokkidate.jpg", caption: "tteokbokki date" },
    { src: "/photos/firstconcerttgt.jpg", caption: "first concert together" }
  ]
  const notes = [
    "hi dovey",
    "yo gurt",
    "happy birthday again",
    "ur 20",
    "hope you have an amazing day",
    "good luck at clinical tomorrow",
    "i love you so much"
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
      {/* song section, in seconds */}
      <Music src="/song.mp3" startAt={45} endAt={56} />
      <DancingCats side="left" />
      <DancingCats side="right" />
    </div>
  );
}

export default App;