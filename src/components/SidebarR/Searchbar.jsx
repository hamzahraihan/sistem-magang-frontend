import { SearchIcon } from '../Icons';
import PropTypes from 'prop-types';

const Searchbar = ({ search, setSearch }) => {
  return (
    <div className="w-full relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <SearchIcon />
      </div>
      <input
        type="search"
        name="input"
        id="default-search"
        className="w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-[20px]"
        placeholder="Cari..."
        onChange={(e) => setSearch({ ...search, [e.target.name]: e.target.value })}
        required
      />
    </div>
  );
};

Searchbar.propTypes = {
  search: PropTypes.object,
  setSearch: PropTypes.func,
};

export default Searchbar;
