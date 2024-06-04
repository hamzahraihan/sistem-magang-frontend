import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useUserContext } from '../hooks/useUserContext';

export const DosenContext = createContext(null);
export const DosenDispatch = createContext(null);

const DosenProvider = ({ children }) => {
  const [dosen, dispatch] = useReducer(DosenReducer, []);
  const { accessToken } = useUserContext();

  const handleCreateDosenAccount = async (values) => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/dosen`, values, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      dispatch({ type: 'ADD_DOSEN', payload: data.result });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DosenContext.Provider value={{ dosen, handleCreateDosenAccount }}>
      <DosenDispatch.Provider value={dispatch}>{children}</DosenDispatch.Provider>
    </DosenContext.Provider>
  );
};
export default DosenProvider;

const DosenReducer = (dosen, action) => {
  switch (action.type) {
    case 'SET_DOSEN_DATA':
      return action.payload;
    case 'DELETE_DOSEN':
      return action.payload;
    case 'ADD_DOSEN':
      return [...dosen, action.payload];
    default:
      return dosen;
  }
};

DosenProvider.propTypes = {
  children: PropTypes.node,
};
