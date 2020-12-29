import React, { Component } from "react";
import AppContext from "../AppContext";
import "./NoteSideBar.css";

class NoteSideBar extends Component {
  static contextType = AppContext;

  render() {
    const { folders, notes } = this.context;
    let currentNoteId = this.props.match.params.noteId;
    let currentNote = notes.find((note) => note.id === currentNoteId) || {
      folderId: "",
    };
    let currentFolderId = currentNote.folderId;
    let currentFolder = folders.find(
      (folder) => folder.id === currentFolderId
    ) || { name: "" };

    return (
      <div className="noteSideBar">
        <h2>{currentFolder.name}</h2>
        <button className="backBtn" onClick={() => this.props.history.goBack()}>
          Back
        </button>
      </div>
    );
  }
};

export default NoteSideBar;
