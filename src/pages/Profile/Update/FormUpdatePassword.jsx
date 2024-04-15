import PropTypes from 'prop-types';
import PrimaryButton from '../../../components/PrimaryButton';
import { useUserContext } from '../../../hooks/useUserContext';

const FormUpdatePassword = ({ formikPassword }) => {
  const { loadingUpdate } = useUserContext();

  const handleInputForm = (event) => {
    const { target } = event;
    formikPassword.setFieldValue(target.name, target.value);
  };
  return (
    <form className="flex flex-col gap-2" onSubmit={formikPassword.handleSubmit}>
      <label htmlFor="password">Kata sandi baru</label>
      <input type="password" name="password" id="password" className="w-full border border-gray-200 rounded-xl p-3 text-xs" placeholder="Password" onChange={handleInputForm} required />
      <p className="text-xs text-red-800">{formikPassword.errors.password}</p>

      <label htmlFor="old_password">Kata sandi lama</label>
      <input type="password" name="old_password" id="old_password" className="w-full border border-gray-200 rounded-xl p-3 text-xs" placeholder="Password lama" onChange={handleInputForm} required />
      <p className="text-xs text-red-800">{formikPassword.errors.old_password}</p>
      <div className="block lg:hidden">
        <PrimaryButton type="submit" text="Ubah password" loading={loadingUpdate} />
      </div>
    </form>
  );
};

FormUpdatePassword.propTypes = {
  formikPassword: PropTypes.object,
};

export default FormUpdatePassword;
