import { createContext, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../hooks/useUserContext';

export const LogbookContext = createContext(null);

export const LogbookDispatch = createContext(null);

const LogbookProvider = ({ children }) => {
  const [logbook, dispatch] = useReducer(LogbookReducer, []);
  const [loading, setLoading] = useState(false);
  const { accessToken } = useUserContext();
  const { logbook_id } = useParams();

  const handleStatusLogbook = async ({ lecturer_note, status }) => {
    console.log('🚀 ~ handleStatusLogbook ~ lecturer_note:', lecturer_note);
    console.log('🚀 ~ handleStatusLogbook ~ status:', status);
    setLoading(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/logbook/weekly/edit/${logbook_id}`,
        { status, lecturer_note },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 201) {
        alert('ok');
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <LogbookContext.Provider value={{ loading, logbook, handleStatusLogbook }}>
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
    case 'EDIT_LOGBOOK_DATA':
      return logbook.map((log) => {
        if (log.id == action.payload.id) {
          return action.payload;
        } else {
          return log;
        }
      });
    default:
      break;
  }
};

LogbookProvider.propTypes = {
  children: PropTypes.node,
};

export default LogbookProvider;
