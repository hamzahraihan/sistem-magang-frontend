import { usePostContext } from '../../../hooks/usePostContext';

const CatagoriesSelect = () => {
  const { searchParams, setSearchParams } = usePostContext();

  const categoryInput = searchParams.get('category_name');

  return (
    <select
      id="large"
      name="category_name"
      className="text-xs w-full p-4 text-gray-900 border border-gray-300 rounded-2xl"
      value={categoryInput}
      onChange={(e) =>
        setSearchParams((prev) => {
          prev.set('category_name', e.target.value);
          return prev;
        })
      }
    >
      <option value="" defaultValue>
        Pilih Kategori
      </option>
      <option value="magang">Magang</option>
      <option value="diskusi">Diskusi</option>
      <option value="kendala">Kendala</option>
      <option value="bertanya">Bertanya</option>
    </select>
  );
};

export default CatagoriesSelect;
