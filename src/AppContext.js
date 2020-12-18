import React, { createContext } from "react"

const AppContext = createContext({
    folders: [],
    notes: [],
    handleDeleteNote: () => {},
    handleAddFolder: () => {},
    handleAddNote: () => {},
});

AppContext.displayName = 'AppContext';

export default AppContext