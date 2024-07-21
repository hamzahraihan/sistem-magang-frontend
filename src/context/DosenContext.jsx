import { createContext, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useUserContext } from '../hooks/useUserContext';
import toast from 'react-hot-toast';

export const DosenContext = createContext(null);
export const DosenDispatch = createContext(null);

const DosenProvider = ({ children }) => {
  const [dosen, dispatch] = useReducer(DosenReducer, []);
  const [loading, setLoading] = useState(false);
  const { accessToken } = useUserContext();

  const handleCreateDosenAccount = async ({ first_name, last_name, email, nidn, password, gender, phone }) => {
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/dosen`,
        {
          first_name,
          last_name,
          email,
          role: 'dosen',
          nidn,
          password,
          gender,
          phone,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toast.success('Akun berhasil ditambahkan');
      setLoading(false);
    } catch (error) {
      toast.error(error);
      // console.log(error);
      setLoading(false);
    }
  };

  return (
    <DosenContext.Provider value={{ dosen, handleCreateDosenAccount, loading }}>
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
