import axios from 'axios';
import { createContext, useReducer, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useUserContext } from '../hooks/useUserContext';
import { TOKEN } from '../constant/key';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export const InternshipContext = createContext();

export const InternshipDispatch = createContext();

export const InternshipProvider = ({ children }) => {
  const token = localStorage.getItem(TOKEN);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
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
  const { userLoggedInData, accessToken } = useUserContext();
  const { internship_id } = useParams();

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
                Authorization: `Bearer ${token}`,
              },
            }
          );

          for (const [index, day] of week.entries()) {
            const response = await axios.post(
              `${import.meta.env.VITE_BASE_URL}/logbook/daily/create`,
              {
                logbook_id: LogbookData.result.logbook_id,
                isComplete: false,
                mahasiswa_id: userLoggedInData?.id,
                log_description: '',
                date_intern: day,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response.status === 201) {
              toast.success('Berhasil dibuat');
            }
          }
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const handleFileUpdate = async ({ instance, location, type, description, phone, status }) => {
    setLoadingUpdate(true);
    const toastId = toast.loading('Sedang proses upload');

    const campusFile = campusFileInputRef.current.files[0];
    const lectureFile = lectureFileInputRef.current.files[0];
    const internshipFile = internFileInputRef.current.files[0];

    const formData = new FormData();

    formData.append('instance', instance);
    formData.append('location', location);
    formData.append('type', type);
    formData.append('description', description);
    formData.append('phone', phone);
    formData.append('status', status);
    formData.append('start_intern', internshipInputData.start_intern);
    formData.append('end_intern', internshipInputData.end_intern);

    if (internshipFile && lectureFile && campusFile) {
      formData.append('files', internshipFile);
      formData.append('files', lectureFile);
      formData.append('files', campusFile);
    } else if (!internshipFile && !lectureFile && !campusFile) {
      formData.append('intern_agreement', internship.intern_agreement);
      formData.append('lecture_agreement', internship.lecture_agreement);
      formData.append('campus_approval', internship.campus_approval);
    }

    try {
      const { data } = await axios.put(`${import.meta.env.VITE_BASE_URL}/internship/${internship_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      dispatch({ type: 'EDIT_INTERNSHIP_DATA', payload: data.result });
      setLoadingUpdate(false);
      toast.dismiss(toastId);
      toast.success('Upload Berhasil');
    } catch (error) {
      setLoadingUpdate(false);
      console.log(error);
    }
  };

  const handleUpdateStatus = async ({ status, lecturer_note }) => {
    setLoadingUpdate(true);
    const formData = new FormData();

    formData.append('status', status);
    formData.append('lecturer_note', lecturer_note);
    formData.append('intern_agreement', internship.intern_agreement);
    formData.append('lecture_agreement', internship.lecture_agreement);
    formData.append('campus_approval', internship.campus_approval);
    try {
      const { data } = await axios.put(`${import.meta.env.VITE_BASE_URL}/internship/${internship_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      dispatch({ type: 'EDIT_INTERNSHIP_DATA', payload: data.result });
      toast.success('Berhasil Validasi');
      setLoadingUpdate(false);
    } catch (error) {
      setLoadingUpdate(false);
      toast.error(error.message);
      console.error(error);
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
        loadingUpdate,
        handleUpdateStatus,
        handleFileUpdate,
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
    case 'EDIT_INTERNSHIP_DATA':
      return action.payload;
  }
};

InternshipProvider.propTypes = {
  children: PropTypes.node,
};
