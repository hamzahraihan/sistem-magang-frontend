import PropTypes from 'prop-types';

const CatagoriesSelect = ({ search, setSearch }) => {
  return (
    <select id="large" name="category_name" className="block w-full p-4 text-base text-gray-900 border border-gray-300 rounded-[20px]" onChange={(e) => setSearch({ ...search, [e.target.name]: e.target.value })}>
      <option defaultValue={true}>Pilih Kategori</option>
      <option value="magang">Magang</option>
      <option value="diskusi">Diskusi</option>
      <option value="kendala">Kendala</option>
      <option value="bertanya">Bertanya</option>
    </select>
  );
};

CatagoriesSelect.propTypes = {
  search: PropTypes.object,
  setSearch: PropTypes.func,
};

export default CatagoriesSelect;
