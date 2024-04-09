import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../../../components/Icons';
import PrimaryButton from '../../../../components/PrimaryButton';

const SidebarUpdate = () => {
  return (
    <div className="lg:col-span-1 gap-4 col-span-3 lg:flex flex-col top-5 lg:items-start w-full">
      <Link to="/" className="flex lg:hidden mb-2 items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all">
        <ArrowIcon />
      </Link>
      <div className="lg:block w-full hidden">
        <PrimaryButton type="submit" text="Ubah profil" />
      </div>
    </div>
  );
};

export default SidebarUpdate;
