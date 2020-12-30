import { createContext } from "react";
import PropTypes from "prop-types"

const AppContext = createContext({
  folders: [],
  notes: [],
  handleDeleteNote: () => {},
  handleAddFolder: () => {},
  handleAddNote: () => {},
});

AppContext.displayName = "AppContext";

AppContext.propTypes = {
  folders: PropTypes.array,
  notes: PropTypes.array,
  handleDeleteNote: PropTypes.func,
  handleAddFolder: PropTypes.func,
  handleAddNote: PropTypes.func,
}

export default AppContext;
