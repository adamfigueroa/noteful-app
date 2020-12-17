import React, { Component } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import AppContext from "../AppContext";
import "./NoteListMain.css";

class NoteListMain extends Component {
  static contextType = AppContext;

  handleDelete = (noteId) => {
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
          this.context.handleDelete(noteId);
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
          <div>
            <Link to={`/note/${note.id}`}>
              <h2>{note.name}</h2>
            </Link>
            <p>Last change: {dateNormalizer}</p>
            <button onClick={() => this.handleDelete(note.id)}>Delete</button>
          </div>
        </li>
      );
    });

    return (
      <div className="noteBox">
        <ul className="noteList">{noteArray}</ul>
        <button>Add Note</button>
      </div>
    );
  }
}

export default NoteListMain;
