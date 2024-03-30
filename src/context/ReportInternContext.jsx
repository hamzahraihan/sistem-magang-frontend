import { createContext, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import toast from 'react-hot-toast';

export const ReportInternContext = createContext(null);

export const ReportInternDispatch = createContext(null);

const ReportInternProvider = ({ children }) => {
  const [reportIntern, dispatch] = useReducer(ReportInternReducer, []);

  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const files = fileInputRef.current.files;
    console.log('🚀 ~ handleFileUpload ~ files:', files);

    if (files.length > 0) {
      const formData = new FormData();

      for (const file of files) {
        formData.append('files', file);
        console.log(formData.get('files'));
      }

      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/report-intern/upload-report`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('file uploaded', response);
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.error('Wajib kirim semua file');
    }
  };

  return (
    <ReportInternContext.Provider value={{ reportIntern, handleFileUpload, fileInputRef }}>
      <ReportInternDispatch.Provider value={dispatch}>{children}</ReportInternDispatch.Provider>
    </ReportInternContext.Provider>
  );
};

const ReportInternReducer = (reportIntern, action) => {
  switch (action.type) {
    case 'SET_REPORT_DATA':
      return action.type;
    case 'ADD_REPORT_DATA':
      return [...reportIntern, action.payload];
    default:
      break;
  }
};

ReportInternProvider.propTypes = {
  children: PropTypes.node,
};

export default ReportInternProvider;
