import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [role, setRole] = useState({ roleChoice: '' });

  const handleRole = (choosenRole) => {
    setRole({ ...role, roleChoice: choosenRole });
  };

  return <UserContext.Provider value={{ role, handleRole }}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node,
};

export default UserProvider;
