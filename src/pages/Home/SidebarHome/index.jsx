import { useState } from 'react';
import Searchbar from './Searchbar';
import PrimaryButton from '../../../components/PrimaryButton';
import CatagoriesSelect from './CatagoriesSelect';

const SidebarHome = () => {
  const [search, setSearch] = useState({
    input: '',
    category_name: '',
  });
  console.log('🚀 ~ SidebarHome ~ search:', search);

  return (
    <div className="sticky lg:flex flex-col top-5 lg:items-start h-[90vh] hidden">
      <form className="flex flex-col gap-4 w-full">
        <Searchbar search={search} setSearch={setSearch} />
        <CatagoriesSelect search={search} setSearch={setSearch} />
        <PrimaryButton text={'Cari'} />
        <PrimaryButton text={'Buat Post'} />
      </form>
    </div>
  );
};

export default SidebarHome;
