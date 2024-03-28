import PropTypes from 'prop-types';
import { createContext, useReducer } from 'react';

export const LogbookWeeklyContext = createContext(null);

export const LogbookWeeklyDispatch = createContext(null);

const LogbookWeeklyProvider = ({ children }) => {
  const [logbookWeekly, dispatch] = useReducer(LogbookWeeklyReducer, []);

  return (
    <LogbookWeeklyContext.Provider
      value={{
        logbookWeekly,
      }}
    >
      <LogbookWeeklyDispatch.Provider value={dispatch}>{children}</LogbookWeeklyDispatch.Provider>
    </LogbookWeeklyContext.Provider>
  );
};

export default LogbookWeeklyProvider;

const LogbookWeeklyReducer = (logbookWeekly, action) => {
  switch (action.type) {
    case 'SET_WEEKLYLOG':
      return action.payload;
    case 'ADD_WEEKLYLOG':
      return [...logbookWeekly, action.payload];
    case 'EDIT_WEEKLYLOG':
      return logbookWeekly.map((weekly) => {
        if (weekly.logbook_id == action.payload.logbook_id) {
          return action.payload;
        } else {
          return weekly;
        }
      });
    default:
      break;
  }
};

LogbookWeeklyProvider.propTypes = {
  children: PropTypes.node,
};
