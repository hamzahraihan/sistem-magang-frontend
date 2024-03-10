/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const UserContext = createContext(null);

export const UserDispatch = createContext(null);

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState({ roleChoice: '' });
  console.log('🚀 ~ UserProvider ~ role:', role.roleChoice.toLowerCase());
  const [token, setToken] = useState('');
  const [user, dispatch] = useReducer(UserReducer, []);

  const { roleUrl } = useParams();

  const handleRole = (choosenRole) => {
    setRole({ ...role, roleChoice: choosenRole });
  };

  useEffect(() => {
    setRole({ ...role, roleChoice: roleUrl });
  }, [roleUrl]);

  useEffect(() => {}, []);

  const handleLogin = async (email, password) => {
    console.log('🚀 ~ handleLogin ~ email:', email);
    try {
      setLoading(true);
      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/account-verification`, {
        email,
        role: role.roleChoice.toLowerCase(),
        password,
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        role,
        handleRole,
        handleLogin,
      }}
    >
      <UserDispatch.Provider value={dispatch}>{children}</UserDispatch.Provider>
    </UserContext.Provider>
  );
};

const UserReducer = (user, action) => {
  switch (action.type) {
    case 'SET_USERDATA':
      return action.userPayload;
    case 'SET_TOKEN':
      return action.token;
  }
};

UserProvider.propTypes = {
  children: PropTypes.node,
};

export default UserProvider;
