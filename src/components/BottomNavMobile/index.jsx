import { NavLink } from 'react-router-dom';
import { HomeIcon } from '../Icons';
import { useUserContext } from '../../hooks/useUserContext';
import Navigation from './Navigation';

const BottomNavMobile = () => {
  const { userLoggedInData } = useUserContext();
  return (
    <div className="fixed bottom-0 left-0 bg-white border-t h-16 w-full m-auto lg:hidden md:hidden sm:hidden">
      <div className={`grid  ${userLoggedInData?.role == 'dosen' ? 'grid-cols-3' : 'grid-cols-5'} h-full place-items-center`}>
        <NavLink to="/" className={({ isActive }) => (isActive ? 'bg-primaryColor hover:bg-hoverColor duration-150 ease-out text-white rounded-full p-4' : 'bg-white')}>
          <HomeIcon />
        </NavLink>
        {/* Conditional Navigation */}
        <Navigation />
      </div>
    </div>
  );
};

export default BottomNavMobile;
