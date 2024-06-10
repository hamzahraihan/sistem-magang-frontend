import PropTypes from 'prop-types';
import useFetchCategory from '../features/category/useFetchCategory';

const CatergoryMobile = ({ setOpenCategory, setSearchParams }) => {
  const { category } = useFetchCategory();
  return (
    <div className="absolute top-7 -right-5 rounded-lg bg-white shadow-md">
      <div className="flex flex-col p-2 text-sm whitespace-nowrap">
        <p className="text-center border-b p-2 mb-1">Kategori</p>
        <button
          type="button"
          className="p-2 hover:bg-gray-200 active:bg-gray-100 rounded-md transition-all"
          value=""
          onClick={(e) => {
            setOpenCategory(false);
            setSearchParams((prev) => {
              prev.set('category_name', e.target.value);
              return prev;
            });
          }}
        >
          Semua
        </button>
        {category.map((item) => (
          <button
            key={item.category}
            type="button"
            className="p-2 hover:bg-gray-200 active:bg-gray-100 rounded-md transition-all"
            value={item.category}
            onClick={(e) => {
              setOpenCategory(false);
              setSearchParams((prev) => {
                prev.set('category_name', e.target.value);
                return prev;
              });
            }}
          >
            {item.category}
          </button>
        ))}
      </div>
    </div>
  );
};

CatergoryMobile.propTypes = {
  setSearchParams: PropTypes.func,
  setOpenCategory: PropTypes.func,
};

export default CatergoryMobile;
