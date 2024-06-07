import _ from 'lodash';
import useFetchCategory from '../../../features/category/useFetchCategory';
import { usePostContext } from '../../../hooks/usePostContext';
import { Spinner } from '../../../components/Icons';

const CatagoriesSelect = () => {
  const { searchParams, setSearchParams } = usePostContext();
  const { loading, category } = useFetchCategory();
  const { post } = usePostContext();

  console.log('🚀 ~ CatagoriesSelect ~ category:', category);

  const handleClick = (category) => {
    setSearchParams((prev) => {
      prev.set('category_name', category);
      return prev;
    });
  };

  const getTotalPost = (category) => {
    const filteredPost = post.filter((item) => item.category_name.toLowerCase().includes(category.toLowerCase()));
    return filteredPost.length;
  };

  const formatNumber = (num) => {
    // Check if the number is negative
    const isNegative = num < 0;
    const absNum = Math.abs(num);

    // Define the suffixes
    const suffixes = ['', 'k', 'm', 'b', 't'];

    // Determine the suffix index based on the number's magnitude
    const suffixIndex = Math.floor(Math.log10(absNum) / 3) || 0;

    // Calculate the scaled number
    const scaledNum = absNum / Math.pow(10, suffixIndex * 3);

    // Format the scaled number with comma separators
    const formattedNum = scaledNum.toFixed(suffixIndex > 0 ? 1 : 0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Append the suffix and the negative sign (if applicable)
    const formattedNumWithSuffix = (isNegative ? '-' : '') + formattedNum + suffixes[suffixIndex];

    return formattedNumWithSuffix;
  };

  return (
    <>
      {/* <select
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
      </select> */}

      <div className="flex flex-col bg-white w-full border border-gray-200 rounded-2xl pb-2">
        <h1 className="text-lg font-bold m-3">Kategori</h1>
        <div role="link" tabIndex="0" className="flex flex-col hover:bg-gray-100 duration-150 p-3 w-full cursor-pointer" onClick={() => handleClick('')}>
          <span className="font-bold text-sm">Semua</span>
          <span className="text-neutral-400">{formatNumber(getTotalPost(''))} Post</span>
        </div>

        {loading ? (
          <div className="p-5">
            <Spinner />
          </div>
        ) : (
          category.map((item) => (
            <>
              <div role="link" tabIndex="0" className="flex flex-col hover:bg-gray-100 duration-150 p-3 w-full cursor-pointer" onClick={() => handleClick(item.category)} key={item.category_id}>
                <span className="font-bold text-sm">{_.capitalize(item.category)}</span>
                <span className="text-neutral-400">{formatNumber(getTotalPost(item.category))} Post</span>
              </div>
            </>
          ))
        )}
      </div>
    </>
  );
};

export default CatagoriesSelect;
