import axios from 'axios';
import { createContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useUserContext } from '../hooks/useUserContext';
import { getInternshipByUser, getInternshipUser } from '../constant/api';
import { useLocation, useParams } from 'react-router-dom';

export const InternshipContext = createContext();

export const InternshipDispatch = createContext();

export const InternshipProvider = ({ children }) => {
  const [internship, dispatch] = useReducer(InternshipReducer, []);
  const [loading, setLoading] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [internshipByID, setInternshipByID] = useState({});

  const [internshipInputData, setInternshipInputData] = useState({
    instance: '',
    location: '',
    type: '',
    description: '',
    phone: '',
    start_intern: '',
    end_intern: '',
  });
  const { userLoggedInData } = useUserContext();

  const { id } = useParams();
  console.log('🚀 ~ InternshipProvider ~ id:', id);
  const { state } = useLocation();

  const internID = useMemo(() => {
    return state ? state.internshipID : null;
  }, [state]);

  const campusFileInputRef = useRef(null);
  const lectureFileInputRef = useRef(null);
  const internFileInputRef = useRef(null);

  useEffect(() => {
    const getUserInternship = async () => {
      setLoading(true);
      try {
        const data = await getInternshipByUser(userLoggedInData?.id);
        dispatch({ type: 'SET_INTERNSHIP_DATA', payload: data });
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getUserInternship();
  }, [userLoggedInData]);

  useEffect(() => {
    const getInternshipById = async () => {
      setLoadingDetail(true);
      try {
        const data = await getInternshipUser(internID || id);
        setInternshipByID(data);
        setLoadingDetail(false);
      } catch (error) {
        console.error(error);
      }
    };
    getInternshipById();
  }, [internID, id]);

  const handleCreateInternship = async (e) => {
    e.preventDefault();
    const campusFile = campusFileInputRef.current.files[0];
    const lectureFile = lectureFileInputRef.current.files[0];
    const internshipFile = internFileInputRef.current.files[0];

    if (campusFile && lectureFile && internshipFile) {
      const formData = new FormData();

      formData.append('mahasiswa_id', userLoggedInData.id);
      formData.append('instance', internshipInputData.instance);
      formData.append('location', internshipInputData.location);
      formData.append('type', internshipInputData.type);
      formData.append('description', internshipInputData.description);
      formData.append('phone', internshipInputData.phone);
      formData.append('start_intern', internshipInputData.start_intern);
      formData.append('end_intern', internshipInputData.end_intern);
      formData.append('files', internshipFile);
      formData.append('files', lectureFile);
      formData.append('files', campusFile);

      console.log(formData.get('files'));

      try {
        const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/internship`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const { start_intern, end_intern } = data.result;

        const startIntern = new Date(start_intern);
        const endIntern = new Date(end_intern);

        const weeksArray = [];

        let currentWeek = [];
        let currentDate = new Date(startIntern);

        while (currentDate <= endIntern) {
          currentWeek.push(new Date(currentDate));

          // Jika hari ini adalah hari Minggu atau hari terakhir dalam bulan, tambahkan array minggu ke dalam array hasil
          if (currentDate.getDay() === 0 || currentDate.getMonth() !== new Date(currentDate).getMonth()) {
            weeksArray.push(currentWeek);
            currentWeek = [];
          }

          currentDate.setDate(currentDate.getDate() + 1);
        }

        for (const [index, week] of weeksArray.entries()) {
          const { data: LogbookData } = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/logbook/weekly/create`,
            {
              internship_id: data.result.internship_id,
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

          console.log('Logbook created:', LogbookData);

          for (const [index, day] of week.entries()) {
            const { data: LogdailyData } = await axios.post(
              `${import.meta.env.VITE_BASE_URL}/logbook/daily/create`,
              {
                logbook_id: LogbookData.result.logbook_id,
                isComplete: false,
                log_description: '',
                date_intern: day,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
            console.log('Logdaily created', LogdailyData);
          }
        }

        console.log('file uploaded', data);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <InternshipContext.Provider
      value={{
        handleCreateInternship,
        internship,
        internshipByID,
        internshipInputData,
        setInternshipInputData,
        internFileInputRef,
        campusFileInputRef,
        lectureFileInputRef,
        loading,
        loadingDetail,
      }}
    >
      <InternshipDispatch.Provider value={dispatch}>{children}</InternshipDispatch.Provider>
    </InternshipContext.Provider>
  );
};

const InternshipReducer = (internship, action) => {
  switch (action.type) {
    case 'SET_INTERNSHIP_DATA':
      return action.payload;
    case 'ADD_INTERNSHIP_DATA':
      return [...internship, action.payload];
  }
};

InternshipProvider.propTypes = {
  children: PropTypes.node,
};
