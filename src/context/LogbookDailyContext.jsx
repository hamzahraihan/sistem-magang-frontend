import { createContext, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { TOKEN } from '../constant/key';
import axios from 'axios';
import toast from 'react-hot-toast';

export const LogbookDailyContext = createContext(null);

export const LogbookDailyDispatch = createContext(null);

const LogbookDailyProvider = ({ children }) => {
  const [logbookDaily, dispatch] = useReducer(LogbookDailyReducer, []);

  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const token = localStorage.getItem(TOKEN);

  const editLogbook = async ({ logday_id, log_description }) => {
    setLoadingUpdate(true);
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/logbook/daily/edit/${logday_id}`,
        {
          log_description,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoadingUpdate(false);
    } catch (error) {
      if (error.response.status === 403) {
        toast.error('Data tidak disimpan karena kamu belum login');
      }
      setLoadingUpdate(false);
    }
  };

  return (
    <LogbookDailyContext.Provider
      value={{
        logbookDaily,
        editLogbook,
        loadingUpdate,
      }}
    >
      <LogbookDailyDispatch.Provider value={dispatch}>{children}</LogbookDailyDispatch.Provider>
    </LogbookDailyContext.Provider>
  );
};

const LogbookDailyReducer = (logbookDaily, action) => {
  switch (action.type) {
    case 'SET_DAILYLOG':
      return action.payload;
    case 'ADD_DAILYLOG':
      return [...logbookDaily, action.payload];
    case 'EDIT_DAILYLOG':
      return logbookDaily.map((day) => {
        if (day.logday_id == action.payload.logday_id) {
          return action.payload;
        } else {
          return day;
        }
      });
    default:
      break;
  }
};

LogbookDailyProvider.propTypes = {
  children: PropTypes.node,
};

export default LogbookDailyProvider;
