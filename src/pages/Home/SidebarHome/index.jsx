import Searchbar from './Searchbar';
import PrimaryButton from '../../../components/PrimaryButton';
import CatagoriesSelect from './CatagoriesSelect';
import { AdjustIcon, PlusIcon } from '../../../components/Icons';
import { useState } from 'react';
import { usePostContext } from '../../../hooks/usePostContext';
import { Link } from 'react-router-dom';

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
    <div className="lg:col-span-1 col-span-3 flex flex-col items-start h-full lg:order-last order-first w-full">
      <form className="flex lg:flex-col items-center gap-4 w-full">
        <Searchbar />
        <div className="flex items-center relative">
          <button type="button" className="cursor-pointer text-gray-500" onClick={() => handleMobileCategory()}>
            <AdjustIcon />
          </button>
          {openCategory && (
            <div className="absolute top-7 -right-5 rounded-lg bg-white shadow-md">
              <div className="flex flex-col p-2 text-sm whitespace-nowrap">
                <p className="text-center border-b p-2 mb-1">Kategori</p>
                <button
                  type="button"
                  className="p-2 hover:bg-gray-200 active:bg-gray-100 rounded-md transition-all"
                  value=""
                  onClick={(e) =>
                    setSearchParams((prev) => {
                      prev.set('category_name', e.target.value);
                      return prev;
                    })
                  }
                >
                  Semua
                </button>
                <button
                  type="button"
                  className="p-2 hover:bg-gray-200 active:bg-gray-100 rounded-md transition-all"
                  value="bertanya"
                  onClick={(e) =>
                    setSearchParams((prev) => {
                      prev.set('category_name', e.target.value);
                      return prev;
                    })
                  }
                >
                  Bertanya
                </button>
                <button
                  type="button"
                  className="p-2 hover:bg-gray-200 active:bg-gray-100 rounded-md transition-all"
                  value="magang"
                  onClick={(e) =>
                    setSearchParams((prev) => {
                      prev.set('category_name', e.target.value);
                      return prev;
                    })
                  }
                >
                  Magang
                </button>
                <button
                  type="button"
                  className="p-2 hover:bg-gray-200 active:bg-gray-100 rounded-md transition-all"
                  value="kendala"
                  onClick={(e) =>
                    setSearchParams((prev) => {
                      prev.set('category_name', e.target.value);
                      return prev;
                    })
                  }
                >
                  Kendala
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="lg:block hidden w-full">
          <CatagoriesSelect />
        </div>
        <div className="text-gray-500">
          <Link to="/create-post">
            <PlusIcon />
          </Link>
        </div>
        <div className="lg:block w-full hidden">
          <PrimaryButton text="Buat Post" />
        </div>
      </form>
    </div>
  );
};

export default SidebarHome;
