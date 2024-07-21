import axios from 'axios';
import { createContext, useReducer, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useUserContext, useUserDispatch } from '../hooks/useUserContext';
import { TOKEN } from '../constant/key';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import _ from 'lodash';

export const InternshipContext = createContext();

export const InternshipDispatch = createContext();

export const InternshipProvider = ({ children }) => {
  const token = localStorage.getItem(TOKEN);
  const [loading, setLoading] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingLetter, setLoadingLetter] = useState(false);

  const [internship, dispatch] = useReducer(InternshipReducer, []);

  const [internshipInputData, setInternshipInputData] = useState({
    start_intern: '',
    end_intern: '',
  });

  const { setUserLoggedInData, userLoggedInData, accessToken } = useUserContext();
  const dispatchUser = useUserDispatch();
  const { internship_id } = useParams();
  const { letter_id } = useParams();

  const campusFileInputRef = useRef(null);
  const lectureFileInputRef = useRef(null);
  const internFileInputRef = useRef(null);
  // const internshipExtendFileRef = useRef(null);
  const letterOfInternshipFileRef = useRef(null);

  const navigate = useNavigate();

  const handleCreateInternship = async (values) => {
    setLoading(true);

    const toastId = toast.loading('Sedang proses upload');
    const campusFile = campusFileInputRef.current.files[0];
    const internshipFile = internFileInputRef.current.files[0];

    const formData = new FormData();

    if (!userLoggedInData) {
      toast.dismiss(toastId);
      toast.error('Kamu belum login');
      return false;
    }

    formData.append('letter_id', letter_id);
    formData.append('mahasiswa_id', userLoggedInData.id);
    formData.append('instance', values.instance);
    formData.append('location', values.location);
    formData.append('type', values.type);
    formData.append('description', values.description);
    formData.append('phone', values.phone);
    formData.append('start_intern', values.start_intern);
    formData.append('end_intern', values.end_intern);
    formData.append('files', internshipFile);
    formData.append('files', campusFile);
    formData.append('lecture_agreement', values.lecture_agreement);

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
          await axios.post(
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
        }
      }
      if (data) {
        setLoading(false);
        toast.dismiss(toastId);
        toast.success('Berhasil mengajukan magang');
        navigate('/kegiatan-magang');
      } else {
        setLoading(false);
        toast.dismiss(toastId);
        toast.error('Gagal mengajukan magang');
      }
    } catch (error) {
      // console.error(error);
      setLoading(false);
      toast.dismiss(toastId);
      toast.error('Gagal mengajukan magang');
    }
  };

  // const handleExtendInternship = async (values) => {
  //   const toastId = toast.loading('Sedang proses upload');
  //   setLoading(true);

  //   const formData = new FormData();
  //   formData.append('start_intern', values.start_intern);
  //   formData.append('end_intern', values.end_intern);

  //   try {
  //     const { data } = await axios.put(`${import.meta.env.VITE_BASE_URL}/internship`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     const { start_intern, end_intern } = data.result;

  //     const startIntern = new Date(start_intern);
  //     const endIntern = new Date(end_intern);

  //     const weeksArray = [];

  //     let currentWeek = [];
  //     let currentDate = new Date(startIntern);

  //     while (currentDate <= endIntern) {
  //       // Check if the current day is not Saturday (6) or Sunday (0)
  //       if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
  //         currentWeek.push(new Date(currentDate));

  //         // If it's Friday or the last day of the month, add the week array to the result array
  //         if (currentDate.getDay() === 5 || currentDate.getMonth() !== new Date(currentDate.getTime() + 86400000).getMonth()) {
  //           weeksArray.push(currentWeek);
  //           currentWeek = [];
  //         }
  //       }

  //       // Move to the next day
  //       currentDate.setDate(currentDate.getDate() + 1);
  //     }

  //     for (const [index, week] of weeksArray.entries()) {
  //       const { data: LogbookData } = await axios.post(
  //         `${import.meta.env.VITE_BASE_URL}/logbook/weekly/create`,
  //         {
  //           internship_id: data.result.internship_id,
  //           mahasiswa_id: userLoggedInData?.id,
  //           log_description: '',
  //           week: index,
  //         },
  //         {
  //           headers: {
  //             'Content-Type': 'application/json',
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       for (const [index, day] of week.entries()) {
  //         await axios.post(
  //           `${import.meta.env.VITE_BASE_URL}/logbook/daily/create`,
  //           {
  //             logbook_id: LogbookData.result.logbook_id,
  //             isComplete: false,
  //             mahasiswa_id: userLoggedInData?.id,
  //             log_description: '',
  //             date_intern: day,
  //           },
  //           {
  //             headers: {
  //               'Content-Type': 'application/json',
  //               Authorization: `Bearer ${token}`,
  //             },
  //           }
  //         );
  //       }
  //     }
  //     if (data) {
  //       setLoading(false);
  //       toast.dismiss(toastId);
  //       toast.success('Berhasil memperpanjang magang');
  //       navigate('/kegiatan-magang');
  //     } else {
  //       setLoading(false);
  //       toast.dismiss(toastId);
  //       toast.error('Gagal mengajukan perpanjangan magang');
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     toast.dismiss(toastId);
  //     console.error(error);
  //   }
  // };

  const handleFileUpdate = async ({ instance, location, type, description, phone, intern_agreement, lecture_agreement, campus_approval }) => {
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
    formData.append('status', 'Belum diterima');

    if (internshipFile && lectureFile && campusFile) {
      formData.append('files', internshipFile);
      formData.append('files', lectureFile);
      formData.append('files', campusFile);
    } else if (!internshipFile && !lectureFile && !campusFile) {
      formData.append('intern_agreement', intern_agreement);
      formData.append('lecture_agreement', lecture_agreement);
      formData.append('campus_approval', campus_approval);
    }

    try {
      await axios.put(`${import.meta.env.VITE_BASE_URL}/internship/${internship_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setLoadingUpdate(false);
      toast.dismiss(toastId);
      toast.success('Upload Berhasil');
    } catch (error) {
      setLoadingUpdate(false);
      toast.dismiss(toastId);
      toast.error('Upload Gagal');
      // console.log(error);
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
      toast.success('Sukses');
      setLoadingUpdate(false);
    } catch (error) {
      setLoadingUpdate(false);
      toast.error(error.message);
      // console.error(error);
    }
  };

  const handleRequestInternship = async ({
    dosen_id,
    phone,
    mahasiswa_address,
    placeofbirth,
    dateofbirth,
    religion,
    type_internship,
    instance,
    letter_receiver,
    instance_address,
    instance_contact,
    description,
    typeofbusiness,
    start_intern,
    end_intern,
  }) => {
    setLoadingLetter(true);
    const toastId = toast.loading('Sedang proses upload');

    const lectureFile = lectureFileInputRef.current.files[0];

    const formData = new FormData();

    formData.append('dosen_id', dosen_id);
    formData.append('phone', phone);
    formData.append('mahasiswa_id', userLoggedInData?.id);
    formData.append('mahasiswa_address', mahasiswa_address);
    formData.append('placeofbirth', placeofbirth);
    formData.append('dateofbirth', dateofbirth);
    formData.append('religion', religion);
    formData.append('type_internship', type_internship);
    formData.append('instance', instance);
    formData.append('letter_receiver', letter_receiver);
    formData.append('instance_address', instance_address);
    formData.append('instance_contact', instance_contact);
    formData.append('typeofbusiness', typeofbusiness);
    formData.append('description', description);
    formData.append('start_intern', start_intern);
    formData.append('end_intern', end_intern);
    formData.append('file', lectureFile);

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/request-internship`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const updateValues = {
        id: userLoggedInData.id,
        role: userLoggedInData.role,
        dosen_id: _.toNumber(dosen_id),
        first_name: userLoggedInData.first_name,
        last_name: userLoggedInData.last_name,
        email: userLoggedInData.email,
        jurusan: userLoggedInData.jurusan,
        angkatan: userLoggedInData.angkatan,
        kelas: userLoggedInData.kelas,
        gender: userLoggedInData.gender,
        image: userLoggedInData.id.image,
        phone: userLoggedInData.phone,
        iat: userLoggedInData.iat,
      };
      setUserLoggedInData(updateValues);
      dispatchUser({ type: 'SET_USER_DATA', payload: updateValues });
      setLoadingLetter(false);
      toast.dismiss(toastId);
      toast.success('Upload Berhasil');
      navigate('/berkas-magang');
    } catch (error) {
      setLoadingLetter(false);
      toast.dismiss(toastId);
      toast.error('Upload Gagal');
      // console.log(error);
    }
  };

  const handleSendLetterInternship = async () => {
    setLoadingLetter(true);
    const toastId = toast.loading('Sedang proses upload');

    const letterOfInternshipFile = letterOfInternshipFileRef.current.files[0];

    const formData = new FormData();

    formData.append('file', letterOfInternshipFile);

    try {
      await axios.put(`${import.meta.env.VITE_BASE_URL}/request-internship/admin/${letter_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setLoadingLetter(false);
      toast.dismiss(toastId);
      toast.success('Upload Berhasil');
      navigate('/dashboard/admin/permohonan-magang');
    } catch (error) {
      setLoadingLetter(false);
      toast.dismiss(toastId);
      toast.error('Upload Gagal');
      // console.log(error);
    }
  };

  return (
    <InternshipContext.Provider
      value={{
        handleCreateInternship,
        internship,
        loading,
        internshipInputData,
        setInternshipInputData,
        internFileInputRef,
        campusFileInputRef,
        lectureFileInputRef,
        letterOfInternshipFileRef,
        loadingUpdate,
        loadingLetter,
        handleUpdateStatus,
        handleFileUpdate,
        handleRequestInternship,
        handleSendLetterInternship,
        // handleExtendInternship,
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
