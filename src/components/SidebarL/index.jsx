import LogoutButton from './LogoutButton';
import NavigationButton from './NavigationButton';
import ProfileButton from './ProfileButton';

const SidebarL = () => {
  return (
    <div className="sticky lg:flex md:flex sm:flex flex-col gap-10 top-5 lg:items-start items-center h-[90vh] hidden">
      <ProfileButton />
      <NavigationButton />
      <LogoutButton />
    </div>
  );
};

export default SidebarL;
