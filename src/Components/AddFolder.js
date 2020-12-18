import React, { Component } from "react";
import AppContext from "../AppContext";

class AddFolder extends Component {
  state = { folderName: "" };

  static contextType = AppContext;

  folderNameValue = (e) => {
    this.setState({ folderName: e.target.value });
  };

  handleAddFolder = (e) => {
    e.preventDefault();
    const url = `http://localhost:9090/folders`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name: this.state.folderName }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((event) => Promise.reject(event));
        } else {
          return response.json();
        }
      })
      .then((responseJson) => {
        this.context.handleAddFolder(responseJson);
        this.setState({ folderName: "" });
        this.props.history.goBack();
      })
      .catch(() => alert("Something went wrong"));
  };

  render() {
    return (
      <div className="addFolderBox">
        <form
          className="addFolderMenu"
          onSubmit={(e) => this.handleAddFolder(e)}
        >
          <label htmlFor="nameInput">Folder Name</label>
          <input
            type="text"
            className="nameInput"
            name="nameInput"
            onChange={this.folderNameValue}
          ></input>
          <button className="submit">Add Folder</button>
        </form>
        <button className="backBtn" onClick={this.props.history.goBack}>Go Back</button>
      </div>
    );
  }
}

export default AddFolder;
