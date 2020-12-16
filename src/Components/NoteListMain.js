import React from 'react'
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import './NoteListMain.css'

const NoteListMain = (props) => {
    let notes = props.notes.map((note) => {
        let date = new Date(note.modified)
        let dateNormalizer = format(date, 'do LLL yyyy')

        return (
            <li className="note" key={note.id}>
                <div>
                    <Link to={`/note/${note.id}`}>
                    <h2>{note.name}</h2>
                    </Link>
                    <p>Last change: {dateNormalizer}</p>
                    <button>Delete</button>
                </div>
            </li>
        )
    })

    return (
        <div className="noteBox">
            <ul className="noteList">
                {notes}
            </ul>
            <button>Add Note</button>
        </div>
    )
}

export default NoteListMain