import Searchbar from './Searchbar';
import PrimaryButton from '../../../components/PrimaryButton';
import CatagoriesSelect from './CatagoriesSelect';
import { AdjustIcon, PlusIcon } from '../../../components/Icons';
import { useState } from 'react';
import { usePostContext } from '../../../hooks/usePostContext';
import { Link } from 'react-router-dom';
import CatergoryMobile from '../../../components/CatergoryMobile';
import CategoryProvider from '../../../context/CategoryContext';
import { Popover } from 'flowbite-react';

const SidebarHome = () => {
  const [openCategory, setOpenCategory] = useState(false);

  const { setSearchParams } = usePostContext();

  return (
    <CategoryProvider>
      <div className="lg:col-span-1 col-span-3 flex flex-col items-start lg:order-last order-first w-full lg:pb-5 ">
        <form className="flex lg:flex-col items-center w-full gap-4">
          <Searchbar />
          <div className="flex items-center relative lg:hidden">
            <Popover
              open={openCategory}
              onOpenChange={setOpenCategory}
              aria-labelledby="default-popover"
              content={
                <>
                  <CatergoryMobile setOpenCategory={setOpenCategory} setSearchParams={setSearchParams} />
                </>
              }
            >
              <button type="button" className="cursor-pointer text-gray-500">
                <AdjustIcon />
              </button>
            </Popover>
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
