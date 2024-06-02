import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const MahasiswaContext = createContext(null);
export const MahasiswaDispatch = createContext(null);

const MahasiswaProvider = ({ children }) => {
  const [mahasiswa, dispatch] = useReducer(MahasiswaReducer, []);
  return (
    <MahasiswaContext.Provider value={mahasiswa}>
      <MahasiswaDispatch.Provider value={dispatch}>{children}</MahasiswaDispatch.Provider>
    </MahasiswaContext.Provider>
  );
};
export default MahasiswaProvider;

const MahasiswaReducer = (mahasiswa, action) => {
  switch (action.type) {
    case 'SET_MAHASISWA_DATA':
      return action.payload;
    case 'DELETE_MAHASISWA':
      return action.payload;
    default:
      return mahasiswa;
  }
};

MahasiswaProvider.propTypes = {
  children: PropTypes.node,
};
