/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { ACCOUNT_KEY, TOKEN } from '../constant/key';

export const UserContext = createContext(null);

export const UserDispatch = createContext(null);

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState({ roleChoice: '' });
  const [user, dispatch] = useReducer(UserReducer, []);
  const [dosenData, setDosenData] = useState([]);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [userLoggedInData, setUserLoggedInData] = useState(user?.id ? user : undefined);

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
    localStorage.clear();
    console.log('Local storage has been deleted');
  };

  useEffect(() => {
    if (cookies === undefined || cookies === '') {
      clearLocalStorage();
    }
  }, []);

  const handleLogout = () => {
    setUserLoggedInData(undefined);
    dispatch({ type: 'REMOVE_USER_DATA', payload: undefined });
  };

  useEffect(() => {
    const token = JSON.stringify(localStorage.getItem(TOKEN));
    try {
      if (token) {
        const decoded = jwtDecode(token);
        setUserLoggedInData(decoded);
        dispatch({ type: 'SET_USER_DATA', payload: decoded });
      } else {
        dispatch({ type: 'SET_USER_DATA', payload: undefined });
      }
    } catch (error) {
      console.error('Must login');
    }
  }, [cookies]);

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/account-verification`, {
        email,
        role: role?.roleChoice?.toLowerCase(),
        password,
      });
      dispatch({ type: 'SET_TOKEN', payload: data.result });
      setLoading(false);
    } catch (error) {
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
      if (error.response.status === 409) {
        alert('Email sudah diregistrasi');
      }
      setLoadingRegister(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        role,
        handleRole,
        handleLogin,
        loading,
        loadingRegister,
        setLoading,
        dosenData,
        handleRegisterAccount,
        handleLogout,
        userLoggedInData,
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
      return [...user, action.payload];
    case 'SET_TOKEN':
      document.cookie = `token=${action.payload}; expires=${expirationTime}`;
      localStorage.setItem(TOKEN, action.payload);
      return action.payload;
    case 'SET_USER_INFORMATION':
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
