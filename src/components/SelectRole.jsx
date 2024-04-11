import { Link } from 'react-router-dom';
import { ConsoleIcon, LecturerIcon, UserIcon } from './Icons';
import PropTypes from 'prop-types';
import { useUserContext } from '../hooks/useUserContext';

const SelectRole = (props) => {
  let roleIcon;
  let content;
  if (props.role == 'Mahasiswa') {
    roleIcon = <UserIcon />;
    content = `Untuk pengguna dengan status sebagai ${props.role} yang berkeinginan ikut program magang mandiri`;
  } else if (props.role == 'Dosen') {
    roleIcon = <LecturerIcon />;
    content = `Untuk pengguna dengan status sebagai ${props.role} yang akan membimbing mahasiswa saat magang mandiri`;
  } else {
    roleIcon = <ConsoleIcon />;
    content = `Untuk pengguna dengan status ${props.role}`;
  }

  const { handleRole } = useUserContext();

  return (
    <Link to={`/login/${props.role}`} className="group flex flex-col gap-2 items-center border border-gray-300 rounded-[32px] hover:bg-primaryColor transition-all p-4 w-full cursor-pointer bg-white" onClick={() => handleRole(props.role)}>
      <div className="rounded-[20px] p-4 bg-primaryColor text-white">{roleIcon}</div>
      <div className="flex flex-col gap-2 w-72 text-center group-hover:text-gray-600">
        <p className="font-bold group-hover:text-white">{props.role}</p>
        <p className="text-xs text-gray-400 group-hover:text-gray-300">{content}</p>
      </div>
    </Link>
  );
};

SelectRole.propTypes = {
  role: PropTypes.string,
};

export default SelectRole;
