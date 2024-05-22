import { createContext, useReducer, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useUserContext } from '../hooks/useUserContext';
import { useParams } from 'react-router-dom';

export const ReportInternContext = createContext(null);

export const ReportInternDispatch = createContext(null);

const ReportInternProvider = ({ children }) => {
  const [reportIntern, dispatch] = useReducer(ReportInternReducer, []);
  console.log('🚀 ~ ReportInternProvider ~ reportIntern:', reportIntern);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const { userLoggedInData } = useUserContext();

  const internCompletedFileInputRef = useRef(null);
  const finalReportFileInputRef = useRef(null);
  const internScoreFileInputRef = useRef(null);

  const { accessToken } = useUserContext();

  const { report_id } = useParams();

  const handleFileUpload = async ({ internship_id, title, note }) => {
    setLoadingUpload(true);
    const toastId = toast.loading('Sedang proses upload');

    const internCompleteFile = internCompletedFileInputRef.current.files[0];
    const finalReportFile = finalReportFileInputRef.current.files[0];
    const internScoreFile = internScoreFileInputRef.current.files[0];

    if (internCompleteFile && finalReportFile && internScoreFile) {
      const formData = new FormData();

      if (!userLoggedInData) {
        setLoadingUpload(false);
        return toast.error('Kamu belum login');
      }
      formData.append('internship_id', internship_id);
      formData.append('mahasiswa_id', userLoggedInData.id);
      formData.append('title', title);
      formData.append('note', note);
      formData.append('files', internCompleteFile);
      formData.append('files', internScoreFile);
      formData.append('files', finalReportFile);

      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/report/upload-report`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log('file uploaded', response);
        toast.success('Upload berhasil');
        toast.dismiss(toastId);
        setLoadingUpload(false);
      } catch (error) {
        console.error(error);
        toast.dismiss(toastId);
        toast.error('Upload gagal');
        setLoadingUpload(false);
      }
    } else {
      toast.error('Wajib kirim semua file');
    }
  };

  const handleFileUpdate = async (values) => {
    console.log('🚀 ~ handleFileUpdate ~ values:', values);
    const { title, note, intern_complete_file, intern_score_file, intern_final_report } = values;

    try {
      setLoadingUpdate(true);
      const toastId = toast.loading('Sedang proses upload');

      const internCompleteFileRef = internCompletedFileInputRef.current.files[0];
      const finalReportFileRef = finalReportFileInputRef.current.files[0];
      const internScoreFileRef = internScoreFileInputRef.current.files[0];

      const formData = new FormData();

      if (!userLoggedInData) {
        setLoadingUpdate(false);
        return toast.error('Kamu belum login');
      }

      formData.append('title', title);
      formData.append('note', note);
      formData.append('status', 'Belum diterima');

      if (internCompleteFileRef && finalReportFileRef && internScoreFileRef) {
        formData.append('files', internCompleteFileRef);
        formData.append('files', finalReportFileRef);
        formData.append('files', internScoreFileRef);
      } else if (!internCompleteFileRef && !finalReportFileRef && !internScoreFileRef) {
        formData.append('intern_complete_file', intern_complete_file);
        formData.append('intern_score_file', intern_score_file);
        formData.append('intern_final_report', intern_final_report);
      }

      try {
        const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/report/${report_id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log('file uploaded', response);
        toast.success('Upload berhasil');
        toast.dismiss(toastId);
        setLoadingUpdate(false);
      } catch (error) {
        console.error(error);
        toast.dismiss(toastId);
        toast.error('Upload gagal');
        setLoadingUpdate(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusReport = async ({ status, lecturer_note }) => {
    setLoadingUpdate(true);
    const formData = new FormData();

    formData.append('status', status);
    formData.append('lecturer_note', lecturer_note);
    formData.append('intern_complete_file', reportIntern.intern_complete_file);
    formData.append('intern_score_file', reportIntern.intern_score_file);
    formData.append('intern_final_report', reportIntern.intern_final_report);
    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/report/${report_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('🚀 ~ handleStatusReport ~ response:', response);

      if (response.status == 201) {
        dispatch({
          type: 'EDIT_REPORT_DATA',
          payload: response.data.result,
        });
        toast.success('Berhasil');
        setLoadingUpdate(false);
      }
    } catch (error) {
      if (error.response.status == 500) {
        toast.error(error.message);
      }
      console.error(error);
      setLoadingUpdate(false);
    }
  };

  return (
    <ReportInternContext.Provider
      value={{
        handleStatusReport,
        reportIntern,
        handleFileUpload,
        handleFileUpdate,
        internCompletedFileInputRef,
        finalReportFileInputRef,
        internScoreFileInputRef,
        loadingUpload,
        loadingUpdate,
      }}
    >
      <ReportInternDispatch.Provider value={dispatch}>{children}</ReportInternDispatch.Provider>
    </ReportInternContext.Provider>
  );
};

const ReportInternReducer = (reportIntern, action) => {
  switch (action.type) {
    case 'SET_REPORT_DATA':
      return action.payload;
    case 'ADD_REPORT_DATA':
      return [...reportIntern, action.payload];
    case 'EDIT_REPORT_DATA':
      return {
        ...action.payload,
        Mahasiswa: reportIntern.Mahasiswa,
        Internship: reportIntern.Internship,
      };
    default:
      break;
  }
};

ReportInternProvider.propTypes = {
  children: PropTypes.node,
};

export default ReportInternProvider;
