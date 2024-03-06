import { ClockIcon, LecturerIcon, OfficeBuilding } from '../../../components/Icons';

const SidebarProfile = () => {
  return (
    <div className="lg:col-span-1 gap-4 col-span-3 flex flex-col top-5 lg:items-start w-full ">
      <div className="flex flex-col gap-2 text-base w-full">
        <div className="flex gap-2 items-center border border-neutral-300 rounded-3xl w-full p-4">
          <div className="flex justify-center items-center rounded-full bg-lime-300 h-12 w-12">
            <LecturerIcon />
          </div>
          <div className="flex flex-col">
            <h1 className="text-base">Angkatan</h1>
            <p className="text-xs text-neutral-400">2020</p>
          </div>
        </div>

        <div className="flex gap-2 items-center border border-neutral-300 rounded-3xl w-full p-4">
          <div className="flex justify-center items-center rounded-full bg-amber-200 h-12 w-12">
            <ClockIcon />
          </div>
          <div className="flex flex-col">
            <h1>Status</h1>
            <p className="text-xs text-neutral-400">Sedang Magang</p>
          </div>
        </div>

        <div className="flex gap-2 items-center border border-neutral-300 rounded-3xl w-full p-4">
          <div className="flex justify-center items-center rounded-full bg-rose-300 h-12 w-12">
            <OfficeBuilding />
          </div>
          <div className="flex flex-col">
            <h1 className="text-base">Perusahaan/Instansi</h1>
            <p className="text-xs text-neutral-400">Diskominfo</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarProfile;
