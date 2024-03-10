import { useEffect } from 'react';
import InternshipLp from '../../assets/svg/Internship-bro.svg';
import { useUserContext } from '../../hooks/useUserContext';
import { useNavigate } from 'react-router-dom';

const LoginMenu = () => {
  const { user } = useUserContext();
  console.log('🚀 ~ LoginMenu ~ user:', user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && user.length === 0 && user == undefined) {
      navigate('/');
    }
  }, [navigate, user]);
  return (
    <div className="lg:flex flex-col gap-10 justify-center items-center border border-gray-300 h-full p-10 rounded-[64px] hidden">
      <img className="w-80" src={InternshipLp} alt="" />
      <div className="flex flex-col gap-2 text-center w-72 text-xs">
        <p className="font-bold text-base">Magang Mandiri</p>
        <p className="text-gray-400">Mulailah Berkontribusi pada Beragam Proyek yang Sesuai dengan Minatmu dan Berikan Dampak Nyata melalui program Magang Mandiri</p>
      </div>
    </div>
  );
};

export default LoginMenu;
