import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class FolderListError extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="errorBox">
          <p>Oh no! your folders aren't here...Try refreshing the page.</p>
        </div>
      );
    }
    return this.props.children;
  }
};

FolderListError.propTypes = {
  hasError: PropTypes.string
}

export default withRouter(FolderListError);
