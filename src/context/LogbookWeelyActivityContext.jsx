import { createContext, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { TOKEN } from '../constant/key';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../hooks/useUserContext';
import toast from 'react-hot-toast';

export const LogbookWeeklyActivityContext = createContext(null);

export const LogbookWeeklyActivityDispatch = createContext(null);

const LogbookWeeklyActivityProvider = ({ children }) => {
  const [weeklyActivity, dispatch] = useReducer(LogbookWeeklyActivityReducer, []);
  console.log('🚀 ~ LogbookWeeklyActivityProvider ~ weeklyActivity:', weeklyActivity);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const token = localStorage.getItem(TOKEN);
  const [loading, setLoading] = useState(false);
  const { accessToken } = useUserContext();
  const { logbook_id } = useParams();

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

  const handleStatusLogbook = async ({ lecturer_note, status }) => {
    setLoadingUpdate(true);
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/logbook/weekly/edit/${logbook_id}`,
        { status, lecturer_note },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log('🚀 ~ handleStatusLogbook ~ data:', data);
      dispatch({ type: 'EDIT_WEEK_ACTIVITY', payload: data.result });
      toast.success('Berhasil diubah');
      setLoadingUpdate(false);
    } catch (error) {
      if (error.response.status === 400) {
        console.error(error);
        toast.error('Gagal diubah');
      }
      setLoading(false);
    }
  };

  return (
    <LogbookWeeklyActivityContext.Provider value={{ loading, weeklyActivity, handleUpdateWeeklyLog, loadingUpdate, handleStatusLogbook }}>
      <LogbookWeeklyActivityDispatch.Provider value={dispatch}>{children}</LogbookWeeklyActivityDispatch.Provider>
    </LogbookWeeklyActivityContext.Provider>
  );
};

const LogbookWeeklyActivityReducer = (weeklyActivity, action) => {
  switch (action.type) {
    case 'SET_WEEK_ACTIVITY':
      return action.payload;
    case 'EDIT_WEEK_ACTIVITY':
      return action.payload;
    default:
      break;
  }
};
LogbookWeeklyActivityProvider.propTypes = {
  children: PropTypes.node,
};

export default LogbookWeeklyActivityProvider;
