import { Outlet } from 'react-router-dom';
import MahasiswaProvider from '../../context/MahasiswaContext';

const DashboardAdmin = () => {
  return (
    <div className="col-span-3 pb-10">
      <MahasiswaProvider>
        <Outlet />
      </MahasiswaProvider>
    </div>
  );
};

export default DashboardAdmin;
