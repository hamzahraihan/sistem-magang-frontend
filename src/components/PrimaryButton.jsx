import PropTypes from 'prop-types';

const PrimaryButton = (props) => {
  return (
    <div className="text-center gap-3 p-4 items-center border rounded-3xl border-neutral-200 transition-all ease-in-out duration-300 bg-primaryColor active:bg-activeColor cursor-pointer mt-auto w-full">
      <p className="font-bold">{props.cari}</p>
    </div>
  );
};

PrimaryButton.propTypes = {
  cari: PropTypes.string,
};

export default PrimaryButton;
