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
            <Link to="/addFolder">
            <button className="folderListBtn">Add Folder</button>
            </Link>
          </div>
        )}
      </AppContext.Consumer>
    );
  };
  
  export default FolderListMain;