function NoteCard({ note, hasNext, onNext }) {
  return (
    <>
      <p className="note-text">{note}</p>
      {hasNext && (
        <button className="note-next" onClick={onNext}>Next</button>
      )}
    </>
  );
}

export default NoteCard;
