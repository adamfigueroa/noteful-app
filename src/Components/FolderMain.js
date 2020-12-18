import React, { Component } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import AppContext from "../AppContext";
import "./FolderMain.css";

class FolderMain extends Component {
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
    let folderId = this.props.match.params.folderId;
    const notesDisplayed = notes.filter((note) => note.folderId === folderId);
    const noteArray = notesDisplayed.map((note) => {
      let date = new Date(note.modified);
      let dateNormalizer = format(date, "do LLL yyyy");

      return (
        <li className="note" key={note.id}>
          <div>
            <h2>
              <Link to={`/note/${note.id}`}>
                {note.name}
              </Link>
            </h2>
            
            <p>Last change: {dateNormalizer}</p>
            <button onClick={() => this.handleDelete(note.id)}>Delete</button>
          </div>
        </li>
      );
    });

    return (
      <div className="noteBox">
        {noteArray.length === 0 && (
          <p>Folder Empty</p>
        )}
        <ul className="noteList">{noteArray}</ul>
        <Link to="/addNote">
        <button className="addNoteBtn">Add Note</button>
        </Link>
      </div>
    );
  }
}

export default FolderMain;
