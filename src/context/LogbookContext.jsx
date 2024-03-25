import { createContext, useEffect, useMemo, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { getDailyLogAPI, getWeeklyLogAPI } from '../constant/api';
import { useLocation, useParams } from 'react-router-dom';

export const LogbookContext = createContext(null);

export const LogbookDispatch = createContext(null);

const LogbookProvider = ({ children }) => {
  const [logbook, dispatch] = useReducer(LogbookReducer, []);
  const [weeks, setWeeks] = useState([]);
  const [dailyLog, setDailyLog] = useState([]);

  const [loadingWeek, setLoadingWeek] = useState(false);
  const [loadingDaily, setLoadingDaily] = useState(false);

  const { state } = useLocation();
  const { id } = useParams();
  const internID = useMemo(() => {
    return state ? state.internshipID : id;
  }, [state, id]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const getWeeklyLog = async () => {
      setLoadingWeek(true);
      try {
        const data = await getWeeklyLogAPI(internID, signal);
        setWeeks(data);
        setLoadingWeek(false);
      } catch (error) {
        if (error.name == 'CanceledError') {
          console.error('Previous request was aborted');
        } else {
          console.error(error);
        }
      }
    };
    getWeeklyLog();
    return () => {
      controller.abort();
    };
  }, [internID]);

  useEffect(() => {
    const getDailyLog = async () => {
      setLoadingDaily(true);
      try {
        const data = await getDailyLogAPI(internID);
        setDailyLog(data);
        setLoadingDaily(false);
      } catch (error) {
        console.error(error);
      }
    };
    getDailyLog();
  }, [internID]);

  return (
    <LogbookContext.Provider value={{ logbook, weeks, dailyLog, loadingWeek, loadingDaily }}>
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
