import forgotPasswordSVG from '../../assets/svg/forgotpassword.svg';

const Sidebar = () => {
  return (
    <div className="lg:flex flex-col gap-10 justify-center items-center border border-gray-300 h-full p-10 rounded-[64px] hidden bg-white">
      <img className="w-80" src={forgotPasswordSVG} alt="forgotpassword" />
      <div className="flex flex-col gap-2 text-center w-72 text-xs">
        <p className="font-bold text-base">Magang Mandiri</p>
        <p className="text-gray-400">Mulailah Berkontribusi pada Beragam Proyek yang Sesuai dengan Minatmu dan Berikan Dampak Nyata melalui program Magang Mandiri</p>
      </div>
    </div>
  );
};

export default Sidebar;
