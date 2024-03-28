import { createContext, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { TOKEN } from '../constant/key';

export const LogbookWeeklyActivityContext = createContext(null);

export const LogbookWeeklyActivityDispatch = createContext(null);

const LogbookWeeklyActivityProvider = ({ children }) => {
  const [weeklyActivity, dispatch] = useReducer(LogbookWeeklyActivityReducer, []);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const token = localStorage.getItem(TOKEN);

  const handleUpdateWeeklyLog = async ({ logbook_id, log_description, status }) => {
    setLoadingUpdate(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/logbook/weekly/edit/${logbook_id}`,
        {
          logbook_id,
          log_description,
          status,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setLoadingUpdate(false);
    } catch (error) {
      console.error(error);
      setLoadingUpdate(false);
    }
  };

  return (
    <LogbookWeeklyActivityContext.Provider value={{ weeklyActivity, handleUpdateWeeklyLog, loadingUpdate }}>
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
      return action.payload;
  }
};
LogbookWeeklyActivityProvider.propTypes = {
  children: PropTypes.node,
};

export default LogbookWeeklyActivityProvider;
