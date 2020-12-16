import React from 'react';
import "./NoteSideBar.css"

function NoteSideBar(props) {
    let currentNoteId = props.match.params.noteId;
    let currentNote = props.notes.find((note) => note.id === currentNoteId);
    let currentFolderId = currentNote.folderId;
    let currentFolder = props.folders.find((folder) => folder.id === currentFolderId);

    return (
        <div className="noteSideBar">
            <h2>{currentFolder.name}</h2>
            <button onClick={() => props.history.goBack()}>Back</button>
        </div>
    )
};

export default NoteSideBar;