import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const LogbookContext = createContext(null);

export const LogbookDispatch = createContext(null);

const LogbookProvider = ({ children }) => {
  const [logbook, dispatch] = useReducer(LogbookReducer, []);

  return (
    <LogbookContext.Provider value={{ logbook }}>
      <LogbookDispatch.Provider value={dispatch}>{children}</LogbookDispatch.Provider>
    </LogbookContext.Provider>
  );
};

const LogbookReducer = (logbook, action) => {
  switch (action.type) {
    case 'SET_LOGBOOK_DATA':
      return action.payload;
    case 'ADD_LOGBOOK_DATA':
      return [...logbook, action.payload];
    default:
      break;
  }
};

LogbookProvider.propTypes = {
  children: PropTypes.node,
};

export default LogbookProvider;
