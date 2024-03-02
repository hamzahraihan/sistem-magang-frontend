import { Outlet } from 'react-router-dom';
import LoginMenu from './LoginMenu';
import UserProvider from '../../context/UserContext';

const index = () => {
  return (
    <div className="flex justify-center items-center h-screen p-10">
      <div className="grid lg:grid-cols-2 grid-cols-1 h-[600px] gap-10 w-[1000px]">
        <UserProvider>
          <LoginMenu />
          <Outlet />
        </UserProvider>
      </div>
    </div>
  );
};

export default index;
