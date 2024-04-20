/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useReducer, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { ACCOUNT_KEY, TOKEN } from '../constant/key';
import toast from 'react-hot-toast';

export const UserContext = createContext(null);

export const UserDispatch = createContext(null);

export const UserProvider = ({ children }) => {
  const [role, setRole] = useState({ roleChoice: '' });
  const [user, dispatch] = useReducer(UserReducer, []);
  const [dosenData, setDosenData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const [userLoggedInData, setUserLoggedInData] = useState(user?.id ? user : undefined);
  const [accessToken, setAccessToken] = useState('');

  const navigate = useNavigate();
  const { roleUrl } = useParams();

  const handleRole = (choosenRole) => {
    setRole({ ...role, roleChoice: choosenRole });
  };

  useEffect(() => {
    setRole({ ...role, roleChoice: roleUrl });
  }, [roleUrl]);

  const getCookie = (name) => {
    const cookieValue = RegExp('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)').exec(document.cookie);
    return cookieValue ? cookieValue.pop() : '';
  };

  const cookies = getCookie('token');

  const clearLocalStorage = () => {
    setUserLoggedInData(undefined);
    setAccessToken(undefined);
    localStorage.clear();
    dispatch({ type: 'REMOVE_USER_DATA', payload: undefined });
    console.log('Local storage has been deleted');
  };

  useEffect(() => {
    if (cookies === undefined || cookies === '') {
      clearLocalStorage();
    }
  }, []);

  const handleLogout = () => {
    setUserLoggedInData(undefined);
    setAccessToken(undefined);
    dispatch({ type: 'REMOVE_USER_DATA', payload: undefined });
  };

  // render data after user communicate with handle function
  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    try {
      if (token) {
        const userData = JSON.parse(localStorage.getItem(ACCOUNT_KEY));
        setUserLoggedInData(userData);
        setAccessToken(token);
      } else {
        dispatch({ type: 'SET_USER_DATA', payload: undefined });
      }
    } catch (error) {
      console.error('Must login');
    }
  }, [cookies]);

  // handling login feature
  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/account-verification`, {
        email,
        role: role?.roleChoice?.toLowerCase(),
        password,
      });
      const decoded = jwtDecode(data.result);
      dispatch({ type: 'SET_USER_DATA', payload: decoded });
      dispatch({ type: 'SET_TOKEN', payload: data.result });
      setLoading(false);
    } catch (error) {
      if (error.response.status == 404) {
        toast.error('Password atau email salah');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleGetDosen = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/dosen`);
        setDosenData(data.result);
      } catch (error) {
        console.error(error);
      }
    };
    handleGetDosen();
  }, []);

  const handleRegisterAccount = async ({ dosen_id, first_name, last_name, email, nim, angkatan, kelas, password, gender }) => {
    try {
      setLoadingRegister(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/mahasiswa`,
        {
          dosen_id,
          first_name,
          last_name,
          email,
          role: 'mahasiswa',
          nim,
          jurusan: 'Sistem Informasi',
          angkatan,
          kelas,
          status: 'Belum magang',
          password,
          image: '',
          gender,
          phone: '',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status == 409) {
        alert('Email already registered');
      }
      setLoadingRegister(false);
      navigate('/login');
    } catch (error) {
      console.error(error);
      setLoadingRegister(false);
    }
  };

  const handleUpdatePassword = async (values) => {
    setLoadingUpdate(true);
    try {
      await axios
        .put(
          `${import.meta.env.VITE_BASE_URL}/users/password/${userLoggedInData?.id}`,
          {
            password: values.password,
            old_password: values.old_password,
            role: userLoggedInData.role,
            email: userLoggedInData.email,
          },
          {
            headers: {
              'Content-Type': `application/json`,
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          setLoadingUpdate(false);
          if (response.status == 201) {
            toast.success('Password berhasil diubah');
          }
        });
    } catch (error) {
      if (error.response.status == 401) {
        toast.error('Password salah');
      }
      console.error(error);
      setLoadingUpdate(false);
    }
  };

  const imageInputRef = useRef(null);
  const handleUpdateProfile = async (values) => {
    const { dosen_id, first_name, last_name, email, nim, nidn, jurusan, old_password, angkatan, kelas, gender, image, phone } = values;
    console.log('🚀 ~ handleUpdateProfile ~ image:', values);

    const imageRef = imageInputRef.current.files[0];

    const formData = new FormData();
    formData.append('dosen_id', dosen_id);
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('jurusan', jurusan);
    formData.append('old_password', old_password);
    formData.append('angkatan', angkatan);
    formData.append('kelas', kelas);
    formData.append('gender', gender);
    formData.append('phone', phone);
    formData.append('email', email);

    // Check if image is defined and not null or empty string
    if (typeof image !== 'undefined' && image !== null && image !== '') {
      formData.append('image', image);
    } else if (typeof imageRef !== 'undefined' && imageRef !== null && imageRef !== '') {
      formData.append('image', imageRef);
    } else {
      formData.append('image', ''); // Default value if both image and imageRef are not set
    }

    console.log(formData.get('image'));

    if (userLoggedInData.role == 'mahasiswa') {
      formData.append('nim', nim);
    } else if (userLoggedInData.role == 'dosen' || userLoggedInData.role == 'admin') {
      formData.append('nidn', nidn);
    }

    setLoadingUpdate(true);
    try {
      await axios
        .put(`${import.meta.env.VITE_BASE_URL}/users/${roleUrl}/${userLoggedInData?.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          if (response.status === 201) {
            // update user data after user made changes
            // updateValues object based from values variable
            const updateValues = {
              id: userLoggedInData.id,
              role: userLoggedInData.role,
              dosen_id,
              first_name,
              last_name,
              email,
              jurusan,
              angkatan,
              kelas,
              gender,
              image: response.data.result.image,
              phone,
              iat: userLoggedInData.iat,
            };
            setUserLoggedInData(updateValues);
            dispatch({ type: 'SET_USER_DATA', payload: updateValues });
            console.log(response);
            toast.success('Profil berhasil diubah');
            setLoadingUpdate(false);
          }
        });
    } catch (error) {
      console.error(error);
      setLoadingUpdate(false);
    }
  };

  const handleForgotPassword = async ({ email }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/forgot-password`, { email });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        role,
        handleRole,
        handleLogin,
        dosenData,
        handleRegisterAccount,
        handleLogout,
        userLoggedInData,
        accessToken,
        imageInputRef,
        handleUpdatePassword,
        handleUpdateProfile,
        setLoading,
        loading,
        loadingRegister,
        loadingUpdate,
        handleForgotPassword,
      }}
    >
      <UserDispatch.Provider value={dispatch}>{children}</UserDispatch.Provider>
    </UserContext.Provider>
  );
};

const expirationTime = new Date(Date.now() + 10 * 60 * 60 * 1000);
const UserReducer = (user, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      localStorage.setItem(ACCOUNT_KEY, JSON.stringify(action.payload));
      return action.payload;
    case 'SET_TOKEN':
      document.cookie = `token=${action.payload}; expires=${expirationTime}; path=/;`;
      localStorage.setItem(TOKEN, action.payload);
      return action.payload;
    case 'REMOVE_USER_DATA':
      document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      localStorage.clear();
      return action.payload;
    default:
      return user;
  }
};

UserProvider.propTypes = {
  children: PropTypes.node,
};

export default UserProvider;
