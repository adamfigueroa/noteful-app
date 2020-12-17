import React from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../AppContext';
import './FolderListMain.css'

const FolderListMain = () => {
    return (
      <AppContext.Consumer>
        {({ folders }) => (
          <div className="folderList">
            {folders.map((folder) => {
              return (
                <Link
                  key={folder.id}
                  to={`/folder/${folder.id}`}
                  className="folderLink"
                >
                  {folder.name}
                </Link>
              );
            })}
            <button className="folderListBtn">Add Folder</button>
          </div>
        )}
      </AppContext.Consumer>
    );
  };
  
  export default FolderListMain;