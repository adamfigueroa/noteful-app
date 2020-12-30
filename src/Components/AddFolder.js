import React, { Component } from "react";
import AppContext from "../AppContext";
import PropTypes from "prop-types";
import "./AddFolder.css";

class AddFolder extends Component {
  static defaultProps = {
    history: { goBack: () => {} },
  };
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

  folderValidator = () => {
    if (this.state.folderName === "") {
      return true;
    }
  };

  updateForm = (event) => {
    this.setState({ [event.target.id]: event.target.value, touched: true });
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
            className="nameInput"
            name="nameInput"
            id="folderName"
            onChange={this.updateForm}
          ></input>
          {this.folderValidator() && this.state.touched && (
            <p className="warningBox">Don't forget to add a name!</p>
          )}
          <button className="submit" disabled={this.folderValidator()}>
            Add Folder
          </button>
        </form>
        <button className="backBtn" onClick={this.props.history.goBack}>
          Go Back
        </button>
      </div>
    );
  }
};

AddFolder.propTypes = {
  folderName: PropTypes.string,
  history: PropTypes.object.isRequired,
};

export default AddFolder;
