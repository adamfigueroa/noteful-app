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
      .then((data) => this.setState({ folders: data }));
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
      .then((data) => this.setState({ notes: data }));
  };

  handleDelete = (noteId) => {
    let filteredNotes = this.state.notes.filter((note) => note.id !== noteId);
    this.setState({ notes: filteredNotes });
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
            handleDelete: this.handleDelete,
          }}
        >
          <div className="bodyBox">
            <section className="sideBarBox">
              <Route path="/" exact component={FolderListMain} />
              <Route path="/folder/:folderId" component={FolderSideBar} />
              <Route path="/note/:noteId" component={NoteSideBar} />
            </section>
            <section className="noteViewBox">
              <Switch>
                <Route path="/" exact component={NoteListMain} />
                <Route path="/folder/:folderId" component={FolderMain} />
                <Route path="/note/:noteId" component={NoteMain} />
              </Switch>
            </section>
          </div>
        </AppContext.Provider>
      </main>
    );
  }
}

export default App;
