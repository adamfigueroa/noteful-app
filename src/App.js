import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Components/Header";
import FolderListMain from "./Components/FolderListMain";
import NoteListMain from "./Components/NoteListMain";
import FolderSideBar from "./Components/FolderSideBar";
import NoteSideBar from "./Components/NoteSideBar";
import FolderMain from "./Components/FolderMain";
import NoteMain from "./Components/NoteMain";
import AppContext from "./AppContext";
import AddFolder from "./Components/AddFolder";
import AddNote from "./Components/AddNote";
import FolderListError from "./Components/FolderListError";
import NoteListError from "./Components/NoteListError";

class App extends Component {
  state = {
    folders: [],
    notes: [],
  };

  fetchFolders = () => {
    let url = "http://localhost:9090/folders";
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.status);
      })
      .then((data) => {
        this.setState({ folders: data });
      })
      .catch((error) => console.log(error.message));
  };

  fetchNotes = () => {
    let url = "http://localhost:9090/notes";
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.status);
      })
      .then((data) => {
        this.setState({ notes: data });
      })
      .catch((error) => console.log(error.message));
  };

  handleDeleteNote = (noteId) => {
    let filteredNotes = this.state.notes.filter((note) => note.id !== noteId);
    this.setState({ notes: filteredNotes });
  };

  handleAddFolder = (folder) => {
    this.setState({ folders: [...this.state.folders, folder] });
  };

  handleAddNote = (note) => {
    this.setState({ notes: [...this.state.notes, note] });
  };

  componentDidMount() {
    this.fetchFolders();
    this.fetchNotes();
  }

  render() {
    return (
      <main className="App">
        <Header />
        <AppContext.Provider
          value={{
            folders: this.state.folders,
            notes: this.state.notes,
            handleDeleteNote: this.handleDeleteNote,
            handleAddFolder: this.handleAddFolder,
            handleAddNote: this.handleAddNote,
          }}
        >
          <Switch>
            <Route path="/addFolder" exact component={AddFolder} />
            <Route path="/addNote" exact component={AddNote} />
            <React.Fragment>
              <div className="bodyBox">
                <section className="sideBarBox">
                  <FolderListError>
                    <Route path="/" exact component={FolderListMain} />
                    <Route path="/folder/:folderId" component={FolderSideBar} />
                    <Route path="/note/:noteId" component={NoteSideBar} />
                  </FolderListError>
                </section>
                <section className="noteViewBox">
                  <NoteListError>
                    <Route path="/" exact component={NoteListMain} />
                    <Route path="/folder/:folderId" component={FolderMain} />
                    <Route path="/note/:noteId" component={NoteMain} />
                  </NoteListError>
                </section>
              </div>
            </React.Fragment>
          </Switch>
        </AppContext.Provider>
      </main>
    );
  }
};

export default App;
