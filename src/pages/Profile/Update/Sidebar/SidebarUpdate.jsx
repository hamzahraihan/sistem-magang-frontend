import PrimaryButton from '../../../../components/PrimaryButton';
import PropTypes from 'prop-types';

const SidebarUpdate = ({ formik, formikPassword, tab, loading }) => {
  return (
    <div className="lg:col-span-1 gap-4 col-span-3 lg:flex flex-col top-5 lg:items-start w-full hidden">
      {tab == 'profile' && (
        <div className="block w-full">
          <PrimaryButton type="button" text="Ubah profil" loading={loading} onClick={formik.handleSubmit} />
        </div>
      )}
      {tab == 'password' && (
        <div className="block w-full">
          <PrimaryButton type="button" text="Ubah password" loading={loading} onClick={formikPassword.handleSubmit} />
        </div>
      )}
    </div>
  );
};

SidebarUpdate.propTypes = {
  tab: PropTypes.string,
  loading: PropTypes.bool,
  formik: PropTypes.object,
  formikPassword: PropTypes.object,
};

export default SidebarUpdate;
