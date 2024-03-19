import PropTypes from 'prop-types';
import { PlusIcon, Spinner } from './Icons';
import { Link } from 'react-router-dom';

const PrimaryButton = (props) => {
  return (
    <>
      {props.text == 'Buat Post' || props.text == 'Daftar Magang' ? (
        <Link to={props.text === 'Buat Post' ? '/create-post' : props.text === 'Daftar Magang' && '/kegiatan-magang/daftar-magang'}>
          <div className="text-center gap-3 p-3 items-center border rounded-2xl border-neutral-200 transition-all duration-150 bg-primaryColor hover:bg-hoverColor active:bg-primaryColor cursor-pointer mt-auto w-full text-white">
            <p className={props.text == 'Buat Post' ? 'flex gap-2 items-center justify-center text-xs' : 'text-xs'}>
              {props.text == 'Buat Post' && <PlusIcon />}
              {props.text}
            </p>
          </div>
        </Link>
      ) : (
        <button
          type={props.type}
          className="text-center gap-3 p-3 items-center border rounded-2xl border-neutral-200 transition-all duration-150 hover:bg-hoverColor bg-primaryColor text-white active:bg-primaryColor cursor-pointer mt-auto w-full disabled:bg-primaryColor/50 "
          disabled={props.loading}
        >
          <p className={props.text == 'Buat Post' ? 'flex gap-2 items-center justify-center text-xs' : 'text-xs'}>
            {props.loading ? (
              <>
                <Spinner />
                <span className="sr-only">Loading...</span>
              </>
            ) : (
              <>
                {props.text == 'Buat Post' && <PlusIcon />}
                {props.text}
              </>
            )}
          </p>
        </button>
      )}
    </>
  );
};

PrimaryButton.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  loading: PropTypes.bool,
};

export default PrimaryButton;
