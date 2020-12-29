import React, { Component } from "react";
import { format } from "date-fns";
import AppContext from "../AppContext";
import "./NoteMain.css";

class NoteMain extends Component {
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
          this.context.handleDeleteNote(noteId);
        }
      })
      .then(() => this.props.history.goBack())
      .catch((error) => console.log(error));
  };

  render() {
    const { notes } = this.context;
    const noteId = this.props.match.params.noteId;
    let note = notes.find((note) => note.id === noteId) || {
      id: noteId,
      modified: new Date().toISOString(),
    };

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
        <button
          className="deleteBtn"
          onClick={() => this.handleDelete(note.id)}
        >
          Delete
        </button>
      </section>
    );
  }
};

export default NoteMain;
