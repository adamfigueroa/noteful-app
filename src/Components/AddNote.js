import React, { Component } from "react";
import AppContext from "../AppContext";
import PropTypes from 'prop-types';
import "./AddNote.css"

class AddNote extends Component {
  static defaultProps = {
    history: { goBack: () => {} },
  };
  state = {
    name: "",
    content: "",
    folderId: "",
    modified: "",
    touched: false,
  };

  static contextType = AppContext;

  updateForm = (event) => {
    this.setState({ [event.target.id]: event.target.value, touched: true });
  };

  handleAddNote = (e) => {
    e.preventDefault();
    const url = `http://localhost:9090/notes`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        content: this.state.content,
        folderId: this.state.folderId,
        modified: this.state.modified,
      }),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then((event) => Promise.reject(event));
        } else {
          return response.json();
        }
      })
      .then(responseJson => {
        this.context.handleAddNote(responseJson);
        this.props.history.goBack();
      })
      .catch(() =>
        alert(
          "Oh dang, you were never supposed to see this page...this is awkward, please refresh the page."
        )
      );
  };

  folderOptions = () => {
    let options = this.context.folders.map((folder) => {
      return (
        <option key={folder.id} value={folder.id}>
          {folder.name}
        </option>
      );
    });
    return options;
  };

  handleModified = () => {
    let today = new Date();
    let iso = today.toISOString();
    this.setState({ modified: iso });
  };

  componentDidMount() {
    this.handleModified();
  }

  nameValidator = () => {
    if (this.state.name === "") {
      return true;
    }
  };

  render() {
    return (
      <div className="addNoteBox">
        <form className="addNoteMenu" onSubmit={(e) => this.handleAddNote(e)}>
          <label htmlFor="noteNameInput">Note Name:</label>
          <input
            className="noteNameInput"
            id="name"
            name="noteNameInput"
            placeholder="Enter name here"
            onChange={(e) => this.updateForm(e)}
          ></input>
          {this.nameValidator() && this.state.touched && (
            <p className="warningBox">Don't forget to add a name!</p>
          )}
          <label htmlFor="noteDetail">Note Details:</label>
          <textarea
            className="noteDetail"
            id="content"
            name="noteDetail"
            rows="4"
            cols="50"
            placeholder="Put note details here"
            onChange={(e) => this.updateForm(e)}
          ></textarea>
          <select
            name="folder"
            id="folderId"
            onChange={(e) => this.updateForm(e)}
          >
            <option>Select Folder</option>
            {this.folderOptions()}
          </select>
          <div>
            <button className="submitNote" disabled={this.nameValidator()}>
              Submit Note
            </button>
          </div>
        </form>
        <button className="backBtn" onClick={this.props.history.goBack}>
          Go Back
        </button>
      </div>
    );
  }
}

AddNote.propTypes = {
  history: PropTypes.object.isRequired,
}

export default AddNote;
