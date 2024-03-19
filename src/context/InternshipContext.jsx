import axios from 'axios';
import { createContext, useEffect, useReducer, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useUserContext } from '../hooks/useUserContext';
import { getInternshipByUser } from '../constant/api';

export const InternshipContext = createContext();

export const InternshipDispatch = createContext();

export const InternshipProvider = ({ children }) => {
  const [internship, dispatch] = useReducer(InternshipReducer, []);
  const [loading, setLoading] = useState(false);
  console.log('🚀 ~ InternshipProvider ~ internship:', internship);
  const [internshipInputData, setInternshipInputData] = useState({
    instance: '',
    location: '',
    type: '',
    description: '',
    phone: '',
    start_intern: '',
    end_intern: '',
  });
  console.log(internshipInputData);
  const { userLoggedInData } = useUserContext();

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
        loading,
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
