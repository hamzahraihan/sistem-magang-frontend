import { ArrowIcon } from '../Icons';

const ProfileButton = () => {
  return (
    <div className="flex flex-row gap-5 p-5 items-center lg:border rounded-[32px] border-neutral-200 border-0 cursor-pointer lg:w-full w-fit">
      <div className="rounded-full bg-slate-400 animate-pulse  h-10 w-10"></div>
      <div className="flex-col lg:flex md:hidden sm:hidden hidden">
        <p className="font-bold text-md">Hamzah Raihan</p>
        <p className="text-neutral-400 text-[10px]">hamzahraihan@gmail.com</p>
      </div>
      <div className="lg:flex hidden ms-auto">
        <ArrowIcon />
      </div>
    </div>
  );
};

export default ProfileButton;
