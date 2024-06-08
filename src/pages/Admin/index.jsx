import { Outlet } from 'react-router-dom';
import MahasiswaProvider from '../../context/MahasiswaContext';
import DosenProvider from '../../context/DosenContext';
import CategoryProvider from '../../context/CategoryContext';

const DashboardAdmin = () => {
  return (
    <div className="col-span-3 pb-10">
      <MahasiswaProvider>
        <DosenProvider>
          <CategoryProvider>
            <Outlet />
          </CategoryProvider>
        </DosenProvider>
      </MahasiswaProvider>
    </div>
  );
};

export default DashboardAdmin;
