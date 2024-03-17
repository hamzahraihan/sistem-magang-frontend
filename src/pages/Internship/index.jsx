import { Outlet } from 'react-router-dom';

const Internship = () => {
  return (
    <div className="col-span-3 pb-10">
      <Outlet />
    </div>
  );
};

export default Internship;
