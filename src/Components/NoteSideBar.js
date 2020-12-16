import React from 'react';

function NoteSideBar(props) {
    let currentNoteId = props.match.params.noteId;
    let currentNote = props.notes.find((note) => note.id === currentNoteId);
    let currentFolderId = currentNote.folderId;
    let currentFolder = props.folders.find((folder) => folder.id === currentFolderId);

    return (
        <div className="noteSideBar">
            <button onClick={() => props.history.goBack()}>Back</button>
            <h2>{currentFolder.name}</h2>
        </div>
    )
};

export default NoteSideBar;