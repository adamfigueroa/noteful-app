import React from 'react'
import { NavLink } from 'react-router-dom'
import './FolderListMain.css'

const FolderListMain = (props) => {
    const folderLinks = props.folders.map((folder) => {
        return (
            <NavLink
            key={folder.id}
            to={`/folder/${folder.id}`}
            className="folderLink"
            activeClassName="selected">{folder.name}</NavLink>
        )
    })

    return (
        <div className="folderList">
            {folderLinks}
            <button className="folderListBtn">Add Folder</button>
        </div>
    )
}

export default FolderListMain