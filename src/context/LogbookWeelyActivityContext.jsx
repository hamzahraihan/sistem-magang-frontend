import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const LogbookWeeklyActivityContext = createContext(null);

export const LogbookWeeklyActivityDispatch = createContext(null);

const LogbookWeeklyActivityProvider = ({ children }) => {
  const [weeklyActivity, dispatch] = useReducer(LogbookWeeklyActivityReducer, []);

  return (
    <LogbookWeeklyActivityContext.Provider value={{ weeklyActivity }}>
      <LogbookWeeklyActivityDispatch.Provider value={dispatch}>{children}</LogbookWeeklyActivityDispatch.Provider>
    </LogbookWeeklyActivityContext.Provider>
  );
};

const LogbookWeeklyActivityReducer = (weeklyActivity, action) => {
  switch (action.type) {
    case 'SET_WEEK_ACTIVITY':
      return action.payload;
    case 'ADD_WEEK_ACTIVITY':
      return action.payload;
    case 'EDIT_WEEK_ACTIVITY':
      return;
  }
};
LogbookWeeklyActivityProvider.propTypes = {
  children: PropTypes.node,
};

export default LogbookWeeklyActivityProvider;
