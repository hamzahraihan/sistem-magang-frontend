import Searchbar from './Searchbar';
import PrimaryButton from '../../../components/PrimaryButton';
import CatagoriesSelect from './CatagoriesSelect';

const SidebarHome = () => {
  return (
    <div className="lg:col-span-1 col-span-3 flex flex-col items-start h-full lg:order-last order-first w-full">
      <form className="flex flex-col gap-4 w-full">
        <Searchbar />
        <CatagoriesSelect />
        <div className="w-full">
          <PrimaryButton text="Buat Post" />
        </div>
      </form>
    </div>
  );
};

export default SidebarHome;
