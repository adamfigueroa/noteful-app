import React from "react"

const AppContext = React.createContext({
    folders: [],
    notes: [],
    handleDelete: () => {},
    addFolder: () => {},
    addNote: () => {},
});

AppContext.displayName = 'AppContext';

export default AppContext