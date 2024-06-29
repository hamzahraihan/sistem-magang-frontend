import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../../components/Icons';
import SidebarInternshipRequirements from './SidebarInternshipRequirements';
import FormsVector from '../../../assets/svg/forms.svg';
import DownloadVector from '../../../assets/svg/filesdownload.svg';
import RequirementCard from './RequirementCard';

const RequirementMenu = () => {
  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="flex flex-col gap-4 lg:col-span-2 col-span-3">
        <Link to="/" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white">
          <ArrowIcon />
        </Link>
        <h1 className="font-bold text-xl">Berkas Magang</h1>
        <div className="grid grid-cols-2 gap-2">
          <RequirementCard vector={FormsVector} link="/berkas-magang/permohonan-magang" title="Form Permohonan Magang" />
          <RequirementCard vector={DownloadVector} link="https://drive.google.com/drive/u/1/folders/13_CQ53O0eIKVCQsuSVlHAqvMFFQD7m6-" title="Unduh Berkas Magang" />
        </div>
        <h1 className="font-bold text-xl">Surat Permohonan Magang</h1>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita, sint ea perspiciatis commodi porro ratione dolor nam error placeat!
      </div>
      <SidebarInternshipRequirements />
    </div>
  );
};

export default RequirementMenu;
