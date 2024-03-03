import PropTypes from 'prop-types';
import { PlusIcon } from './Icons';

const PrimaryButton = (props) => {
  console.log('🚀 ~ PrimaryButton ~ props:', props);
  return (
    <div className="text-center gap-3 p-3 items-center border rounded-3xl border-neutral-200 transition-all duration-150 bg-primaryColor active:bg-activeColor cursor-pointer mt-auto w-full">
      <p className={props.text == 'Buat Post' ? 'flex gap-2 items-center justify-center' : 'text-xs'}>
        {props.text == 'Buat Post' && <PlusIcon />}
        {props.text}
      </p>
    </div>
  );
};

PrimaryButton.propTypes = {
  text: PropTypes.string,
};

export default PrimaryButton;
