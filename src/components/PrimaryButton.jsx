import PropTypes from 'prop-types';
import { PlusIcon } from './Icons';
import { Link } from 'react-router-dom';

const PrimaryButton = (props) => {
  return (
    <>
      {props.text == 'Buat Post' ? (
        <Link to="/create-post">
          <div className="text-center gap-3 p-3 items-center border rounded-xl border-neutral-200 transition-all duration-150 bg-primaryColor active:bg-activeColor cursor-pointer mt-auto w-full">
            <p className={props.text == 'Buat Post' ? 'flex gap-2 items-center justify-center text-xs' : 'text-xs'}>
              {props.text == 'Buat Post' && <PlusIcon />}
              {props.text}
            </p>
          </div>
        </Link>
      ) : (
        <button className="text-center gap-3 p-3 items-center border rounded-xl border-neutral-200 transition-all duration-150 bg-primaryColor active:bg-activeColor cursor-pointer mt-auto w-full">
          <p className={props.text == 'Buat Post' ? 'flex gap-2 items-center justify-center text-xs' : 'text-xs'}>
            {props.text == 'Buat Post' && <PlusIcon />}
            {props.text}
          </p>
        </button>
      )}
    </>
  );
};

PrimaryButton.propTypes = {
  text: PropTypes.string,
};

export default PrimaryButton;
