import React from "react";
import { NavLink } from "react-router-dom";
import AppContext from "../AppContext";

const FolderSideBar = () => {
  return (
    <AppContext.Consumer>
      {({ folders }) => (
        <div className="folderList">
          {folders.map((folder) => {
            return (
              <NavLink
                key={folder.id}
                to={`/folder/${folder.id}`}
                className="folderLink"
                activeClassName="selected"
              >
                {folder.name}
              </NavLink>
            );
          })}
          <button className="folderListBtn">Add Folder</button>
        </div>
      )}
    </AppContext.Consumer>
  );
};

export default FolderSideBar;
