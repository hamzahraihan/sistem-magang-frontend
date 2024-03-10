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

  const navigate = useNavigate();

  const [user, dispatch] = useReducer(UserReducer, []);
  console.log(user[0]);

  const { roleUrl } = useParams();

  const handleRole = (choosenRole) => {
    setRole({ ...role, roleChoice: choosenRole });
  };

  useEffect(() => {
    setRole({ ...role, roleChoice: roleUrl });
  }, [roleUrl]);

  const cookies = document.cookie;

  useEffect(() => {
    try {
      const token = JSON.stringify(localStorage.getItem(TOKEN));
      if (token) {
        const decoded = jwtDecode(token);
        console.log('🚀 ~ useEffect ~ decode:', decoded);
        dispatch({ type: 'SET_USER_DATA', payload: decoded });
        navigate('/');
      } else {
        dispatch({ type: 'SET_USER_DATA', payload: undefined });
      }
    } catch (error) {
      console.error('no token found');
    }
  }, [cookies]);

  const handleLogin = async (email, password) => {
    console.log('🚀 ~ handleLogin ~ email:', email);
    try {
      setLoading(true);
      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/account-verification`, {
        email,
        role: role?.roleChoice?.toLowerCase(),
        password,
      });
      dispatch({ type: 'SET_TOKEN', payload: data.result });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        role,
        handleRole,
        handleLogin,
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
