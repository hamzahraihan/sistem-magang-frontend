import { useState } from 'react';
import Searchbar from './Searchbar';
import PrimaryButton from '../PrimaryButton';
import CatagoriesSelect from './CatagoriesSelect';

const SidebarR = () => {
  const [search, setSearch] = useState({
    input: '',
    category_name: '',
  });
  console.log('🚀 ~ SidebarR ~ search:', search);

  return (
    <div className="sticky lg:flex md:flex sm:flex flex-col gap-10 top-5 lg:items-start h-[90vh] hidden">
      <form className="flex flex-col gap-10 w-full">
        <Searchbar search={search} setSearch={setSearch} />
        <CatagoriesSelect search={search} setSearch={setSearch} />
        <PrimaryButton cari={'Cari'} />
      </form>
    </div>
  );
};

export default SidebarR;
