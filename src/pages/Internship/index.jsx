import { Outlet } from 'react-router-dom';

const Internship = () => {
  return (
    <div className="col-span-3">
      <Outlet />
    </div>
  );
};

export default Internship;
