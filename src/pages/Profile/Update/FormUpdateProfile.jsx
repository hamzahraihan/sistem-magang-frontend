import useFetchUserByID from '../../../features/user/useFetchUserById';
import { useUserContext } from '../../../hooks/useUserContext';
import PropTypes from 'prop-types';

const FormUpdateProfile = ({ formik, handleInputForm }) => {
  const { userByID } = useFetchUserByID();
  console.log('🚀 ~ FormUpdateProfile ~ userById:', userByID);
  const { dosenData } = useUserContext();
  console.log('🚀 ~ FormUpdateProfile ~ dosenData:', dosenData);

  return (
    <div className="flex flex-col w-full">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="first_name">Nama Depan</label>
          <input name="first_name" id="first_name" className="border border-gray-200 rounded-xl p-3 text-xs" type="text" placeholder="Nama depan..." onChange={handleInputForm} required />
          <p className="text-xs text-red-800">{formik.errors.first_name}</p>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="last_name">Nama Belakang</label>
          <input name="last_name" id="last_name" className="border border-gray-200 rounded-xl p-3 text-xs" type="text" placeholder="Nama belakang..." onChange={handleInputForm} required />
          <p className="text-xs text-red-800">{formik.errors.last_name}</p>
        </div>
      </div>
    </div>
  );
};

FormUpdateProfile.propTypes = {
  formik: PropTypes.func,
  handleInputForm: PropTypes.func,
};

export default FormUpdateProfile;
