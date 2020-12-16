import React from "react";
import { format } from "date-fns";
import "./NoteMain.css"

function NoteMain(props) {
  const noteId = props.match.params.noteId;
  let note = props.notes.filter((note) => note.id === noteId);
  note = note[0];
  console.log(noteId);
  let date = new Date(note.modified);
  let dateNormalizer = format(date, "do LLL yyyy");

  return (
    <section className="detailedNote">
      <div className="noteTitle">
        <h2>{note.name}</h2>
      </div>
      <div className="noteInfo">
        <p>Last change: {dateNormalizer}</p>
      </div>
      <div className="noteDetail">{note.content}</div>
      <button>Delete</button>
    </section>
  );
}

export default NoteMain;
