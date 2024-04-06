import { Outlet } from 'react-router-dom';
import LoginMenu from './LoginMenu';
import UserProvider from '../../context/UserContext';
import { Toaster } from 'react-hot-toast';

const index = () => {
  return (
    <div className="flex justify-center items-center p-10">
      <div className="grid lg:grid-cols-2 grid-cols-1 h-fit gap-10 w-[1000px]">
        <UserProvider>
          <LoginMenu />
          <Outlet />
          <Toaster />
        </UserProvider>
      </div>
    </div>
  );
};

export default index;
