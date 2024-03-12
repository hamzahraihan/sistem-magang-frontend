import { SearchIcon } from '../../../components/Icons';
import { usePostContext } from '../../../hooks/usePostContext';

const Searchbar = () => {
  const { searchParams, setSearchParams } = usePostContext();

  const searchInput = searchParams.get('search');
  return (
    <div className="w-full relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <SearchIcon />
      </div>
      <input
        type="search"
        name="input"
        id="default-search"
        className="w-full text-xs p-4 ps-10 text-gray-900 border border-gray-300 rounded-[20px]"
        placeholder="Cari..."
        value={searchInput}
        onChange={(e) =>
          setSearchParams((prev) => {
            prev.set('search', e.target.value);
            return prev;
          })
        }
        required
      />
    </div>
  );
};

export default Searchbar;
