import PrimaryButton from '../../../../components/PrimaryButton';
import PropTypes from 'prop-types';

const SidebarUpdate = ({ tab }) => {
  return (
    <div className="lg:col-span-1 gap-4 col-span-3 lg:flex flex-col top-5 lg:items-start w-full hidden">
      {tab == 'profile' && (
        <div className="block w-full">
          <PrimaryButton type="submit" text="Ubah profil" />
        </div>
      )}
      {tab == 'password' && (
        <div className="block w-full">
          <PrimaryButton type="submit" text="Ubah password" />
        </div>
      )}
    </div>
  );
};

SidebarUpdate.propTypes = {
  tab: PropTypes.string,
};

export default SidebarUpdate;
