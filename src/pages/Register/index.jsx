import FormRegister from './FormRegister';
import RegisterMenu from './RegisterMenu';

const index = () => {
  return (
    <div className="flex justify-center items-center h-screen p-10">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 w-[1000px]">
        <RegisterMenu />
        <FormRegister />
      </div>
    </div>
  );
};

export default index;
