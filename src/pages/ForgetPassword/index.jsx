import UserProvider from '../../context/UserContext';
import Form from './Form';
import Sidebar from './Sidebar';

const ForgotPassword = () => {
  return (
    <div className="flex justify-center items-center lg:p-10 p-5 bg-gray-50 h-screen">
      <div className="grid lg:grid-cols-2 grid-cols-1 h-fit gap-10 w-[1000px]">
        <UserProvider>
          <Sidebar />
          <Form />
        </UserProvider>
      </div>
    </div>
  );
};

export default ForgotPassword;
