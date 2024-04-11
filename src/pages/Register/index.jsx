import UserProvider from '../../context/UserContext';
import FormRegister from './FormRegister';
import RegisterMenu from './RegisterMenu';

const index = () => {
  return (
    <div className="flex justify-center items-center h-full p-10 bg-gray-50">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 w-[1000px]">
        <UserProvider>
          <RegisterMenu />
          <FormRegister />
        </UserProvider>
      </div>
    </div>
  );
};

export default index;
