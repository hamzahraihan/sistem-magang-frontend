/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { ACCOUNT_KEY, TOKEN } from '../constant/key';

export const UserContext = createContext(null);

export const UserDispatch = createContext(null);

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState({ roleChoice: '' });

  const [loadingProfile, setLoadingProfile] = useState(false);

  const [user, dispatch] = useReducer(UserReducer, []);
  console.log('🚀 ~ UserProvider ~ user:', user);

  const [userInformation, setUserInformation] = useState([]);

  const { roleUrl } = useParams();
  const { id } = useParams();

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

  useEffect(() => {
    try {
      const token = JSON.stringify(localStorage.getItem(TOKEN));
      if (token) {
        const decoded = jwtDecode(token);
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
    console.log(loading);
  }, [loading]);

  useEffect(() => {
    const handleUserById = async () => {
      setLoadingProfile(true);
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/${roleUrl}/${id}`);
        setUserInformation(data.result);
        setLoadingProfile(false);
      } catch (error) {
        console.error('No id params found');
      }
    };
    handleUserById();
  }, [id]);

  return (
    <UserContext.Provider
      value={{
        user,
        role,
        handleRole,
        handleLogin,
        loading,
        loadingProfile,
        setLoading,
        userInformation,
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
      return [];
    default:
      return user;
  }
};

UserProvider.propTypes = {
  children: PropTypes.node,
};

export default UserProvider;
