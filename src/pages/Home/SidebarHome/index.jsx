import Searchbar from './Searchbar';
import PrimaryButton from '../../../components/PrimaryButton';
import CatagoriesSelect from './CatagoriesSelect';

const SidebarHome = () => {
  return (
    <div className="sticky lg:flex flex-col top-5 lg:items-start h-[90vh] hidden">
      <form className="flex flex-col gap-4 w-full">
        <Searchbar />
        <CatagoriesSelect />
        <PrimaryButton text={'Buat Post'} />
      </form>
    </div>
  );
};

export default SidebarHome;
