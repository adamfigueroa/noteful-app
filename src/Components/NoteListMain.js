import React, { Component } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import AppContext from "../AppContext";
import "./NoteListMain.css";

class NoteListMain extends Component {
  static contextType = AppContext;

  handleDeleteNote = (noteId) => {
    const urlDelete = `http://localhost:9090/notes/${noteId}`;
    fetch(urlDelete, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        } else {
          this.context.handleDeleteNote(noteId);
        }
      })
      .catch((error) => console.log(error));
  };

  render() {
    const { notes } = this.context;
    let noteArray = notes.map((note) => {
      let date = new Date(note.modified);
      let dateNormalizer = format(date, "do LLL yyyy");

      return (
        <li className="note" key={note.id}>
          <div className="noteItem">
            <h2 className="noteName">
              <Link to={`/note/${note.id}`}>{note.name}</Link>
            </h2>
            <p>Last change: {dateNormalizer}</p>
            <button
              className="deleteNoteBtn"
              onClick={() => this.handleDeleteNote(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      );
    });

    return (
      <div className="noteBox">
        <ul className="noteList">{noteArray}</ul>
        <Link to="/addNote">
          <button className="addNoteBtn">Add Note</button>
        </Link>
      </div>
    );
  }
};

export default NoteListMain;
