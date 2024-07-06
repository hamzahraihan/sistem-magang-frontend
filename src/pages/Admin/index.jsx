import { Outlet } from 'react-router-dom';
import MahasiswaProvider from '../../context/MahasiswaContext';
import DosenProvider from '../../context/DosenContext';
import CategoryProvider from '../../context/CategoryContext';
import { Toaster } from 'react-hot-toast';

const DashboardAdmin = () => {
  return (
    <div className="col-span-3 pb-10 min-w-full">
      <MahasiswaProvider>
        <DosenProvider>
          <CategoryProvider>
            <Outlet />
            <Toaster position="top-center" />
          </CategoryProvider>
        </DosenProvider>
      </MahasiswaProvider>
    </div>
  );
};

export default DashboardAdmin;
