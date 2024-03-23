import { createContext, useEffect, useMemo, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { getInternshipUser } from '../constant/api';
import { useLocation } from 'react-router-dom';
import { useUserContext } from '../hooks/useUserContext';
import axios from 'axios';

export const LogbookContext = createContext(null);

export const LogbookDispatch = createContext(null);

const LogbookProvider = ({ children }) => {
  const [logbook, dispatch] = useReducer(LogbookReducer, []);

  const [weeks, setWeeks] = useState([]);
  console.log('🚀 ~ LogbookProvider ~ weeks:', weeks);

  // weeks.forEach((element, index) => {
  //   element.forEach((week) => {
  //     console.log(week);
  //   });
  // });

  const { userLoggedInData } = useUserContext();

  const { state } = useLocation();

  const internID = useMemo(() => {
    return state ? state.internshipID : null;
  }, [state]);

  useEffect(() => {
    const getWeeklyLog = async () => {
      try {
        const data = await getInternshipUser(internID);
        dispatch({ type: 'SET_LOGBOOK_DATA', payload: data });
      } catch (error) {
        console.error(error);
      }
    };
    getWeeklyLog();
  }, [internID]);

  useEffect(() => {
    const generateWeeksBetweenDates = () => {
      const start = new Date(logbook.start_intern);
      const end = new Date(logbook.end_intern);

      const weeksArray = [];

      let currentWeek = [];
      let currentDate = new Date(start);

      while (currentDate <= end) {
        currentWeek.push(new Date(currentDate));

        // Jika hari ini adalah hari Minggu atau hari terakhir dalam bulan, tambahkan array minggu ke dalam array hasil
        if (currentDate.getDay() === 0 || currentDate.getMonth() !== new Date(currentDate).getMonth()) {
          weeksArray.push(currentWeek);
          currentWeek = [];
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }

      setWeeks(weeksArray);
    };
    generateWeeksBetweenDates();
  }, [logbook, internID]);

  const handleCreateLogbook = async (internshipForm) => {
    console.log('🚀 ~ handleCreateLogbook ~ internshipForm:', internshipForm);
    try {
      for (const [index, week] of weeks.entries()) {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/logbook/weekly/create`,
          {
            internship_id: internshipForm.internship_id,
            mahasiswa_id: userLoggedInData?.id,
            log_description: '',
            week: index,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('Logbook created:', data);
      }
    } catch (error) {
      console.error('Error creating logbook:', error);
    }
  };

  return (
    <LogbookContext.Provider value={{ logbook, weeks, handleCreateLogbook }}>
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
