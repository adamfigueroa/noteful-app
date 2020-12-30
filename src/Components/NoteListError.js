import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types"

class NoteListError extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="errorBox">
          <p>Oh no! your notes aren't here...Try refreshing the page.</p>
        </div>
      );
    }
    return this.props.children;
  }
};

NoteListError.propTypes = {
  hasError: PropTypes.bool
}

export default withRouter(NoteListError);
