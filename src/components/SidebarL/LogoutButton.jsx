import { useUserContext } from '../../hooks/useUserContext';

const LogoutButton = () => {
  const { handleLogout } = useUserContext();
  return (
    <button className="text-center gap-3 p-4 items-center border rounded-3xl border-neutral-200 transition-all ease-in-out duration-150 hover:bg-primaryColor cursor-pointer mt-auto lg:w-full w-fit" onClick={handleLogout}>
      <p className="font-bold">Log Out</p>
    </button>
  );
};

export default LogoutButton;
