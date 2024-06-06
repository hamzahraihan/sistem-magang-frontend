import Searchbar from './Searchbar';
import PrimaryButton from '../../../components/PrimaryButton';
import CatagoriesSelect from './CatagoriesSelect';
import { AdjustIcon, PlusIcon } from '../../../components/Icons';
import { useState } from 'react';
import { usePostContext } from '../../../hooks/usePostContext';
import { Link } from 'react-router-dom';
import CatergoryMobile from '../../../components/CatergoryMobile';
import CategoryProvider from '../../../context/CategoryContext';

const SidebarHome = () => {
  const [openCategory, setOpenCategory] = useState(false);

  const { setSearchParams } = usePostContext();

  const handleMobileCategory = () => {
    if (openCategory) {
      setOpenCategory(false);
    } else if (!openCategory) {
      setOpenCategory(true);
    }
  };

  return (
    <CategoryProvider>
      <div className="lg:col-span-1 col-span-3 flex flex-col items-start h-full lg:order-last order-first w-full">
        <form className="flex lg:flex-col items-center gap-4 w-full">
          <Searchbar />
          <div className="flex items-center relative lg:hidden">
            <button type="button" className="cursor-pointer text-gray-500" onClick={() => handleMobileCategory()}>
              <AdjustIcon />
            </button>
            {openCategory && <CatergoryMobile setSearchParams={setSearchParams} />}
          </div>
          <div className="lg:block hidden w-full">
            <CatagoriesSelect />
          </div>
          <div className="text-gray-500 lg:hidden">
            <Link to="/create-post">
              <PlusIcon />
            </Link>
          </div>
          <div className="lg:block w-full hidden">
            <PrimaryButton text="Buat Post" />
          </div>
        </form>
      </div>
    </CategoryProvider>
  );
};

export default SidebarHome;
