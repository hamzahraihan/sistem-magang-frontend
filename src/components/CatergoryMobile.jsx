import PropTypes from 'prop-types';

const CatergoryMobile = ({ setSearchParams }) => {
  return (
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
  );
};

CatergoryMobile.propTypes = {
  setSearchParams: PropTypes.func,
};

export default CatergoryMobile;
