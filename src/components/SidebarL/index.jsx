import { useUserContext } from '../../hooks/useUserContext';
import LogoutButton from './LogoutButton';
import NavigationButton from './NavigationButton';
import ProfileButton from './ProfileButton';

const SidebarL = () => {
  const { user, userLoggedInData } = useUserContext();
  console.log('🚀 ~ SidebarL ~ user:', user);
  return (
    <div className="sticky lg:flex md:flex sm:flex flex-col gap-4 top-5 lg:items-start items-center h-screen pb-10 hidden">
      <ProfileButton />
      <NavigationButton />
      {userLoggedInData && <LogoutButton />}
    </div>
  );
};

export default SidebarL;
