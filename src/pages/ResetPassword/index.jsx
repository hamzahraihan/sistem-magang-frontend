import { Toaster } from 'react-hot-toast';
import UserProvider from '../../context/UserContext';
import Form from './Form';

const ResetPassword = () => {
  return (
    <div className="flex justify-center items-center lg:p-10 p-5 h-screen">
      <UserProvider>
        <Form />
        <Toaster position="top-center" />
      </UserProvider>
    </div>
  );
};

export default ResetPassword;
