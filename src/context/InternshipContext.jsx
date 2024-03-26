import axios from 'axios';
import { createContext, useReducer, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useUserContext } from '../hooks/useUserContext';
import { TOKEN } from '../constant/key';

export const InternshipContext = createContext();

export const InternshipDispatch = createContext();

export const InternshipProvider = ({ children }) => {
  const token = localStorage.getItem(TOKEN);
  const [internship, dispatch] = useReducer(InternshipReducer, []);
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

  const campusFileInputRef = useRef(null);
  const lectureFileInputRef = useRef(null);
  const internFileInputRef = useRef(null);

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
            Authorization: `Bearer ${token}`,
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
        internshipInputData,
        setInternshipInputData,
        internFileInputRef,
        campusFileInputRef,
        lectureFileInputRef,
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
