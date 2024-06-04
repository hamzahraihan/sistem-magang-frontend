import { Outlet } from 'react-router-dom';
import MahasiswaProvider from '../../context/MahasiswaContext';
import DosenProvider from '../../context/DosenContext';

const DashboardAdmin = () => {
  return (
    <div className="col-span-3 pb-10">
      <MahasiswaProvider>
        <DosenProvider>
          <Outlet />
        </DosenProvider>
      </MahasiswaProvider>
    </div>
  );
};

export default DashboardAdmin;
