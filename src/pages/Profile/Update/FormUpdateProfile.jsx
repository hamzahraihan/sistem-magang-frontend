import { EmailIcon } from '../../../components/Icons';
import { useUserContext } from '../../../hooks/useUserContext';
import PropTypes from 'prop-types';

const FormUpdateProfile = ({ formik, handleInputForm }) => {
  const { dosenData } = useUserContext();

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="grid grid-cols-2 gap-2 p-0">
        <div className="flex flex-col gap-2">
          <label htmlFor="first_name">Nama Depan</label>
          <input name="first_name" id="first_name" className="border border-gray-200 rounded-xl p-3 text-xs" type="text" placeholder="Nama depan..." value={formik.values.first_name} onChange={handleInputForm} required />
          <p className="text-xs text-red-800">{formik.errors.first_name}</p>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="last_name">Nama Belakang</label>
          <input name="last_name" id="last_name" className="border border-gray-200 rounded-xl p-3 text-xs" type="text" placeholder="Nama belakang..." value={formik.values.last_name} onChange={handleInputForm} required />
          <p className="text-xs text-red-800">{formik.errors.last_name}</p>
        </div>
      </div>

      <label htmlFor="gender">Jenis Kelamin</label>
      <select id="gender" name="gender" className="text-xs p-3 border border-gray-200 rounded-xl mb-1" value={formik.values.gender} onChange={handleInputForm} required>
        <option defaultValue={null}>Pilih jenis kelamin</option>
        <option value="laki-laki">Laki-laki</option>
        <option value="perempuan">Perempuan</option>
      </select>

      <label htmlFor="kelas">Kelas</label>
      <input name="kelas" id="kelas" className="border border-gray-200 rounded-xl p-3 text-xs" type="text" placeholder="Cont: 5B, 6A..." value={formik.values.kelas} onChange={handleInputForm} required />
      <p className="text-xs text-red-800">{formik.errors.kelas}</p>

      <label htmlFor="angkatan">Angkatan</label>
      <input name="angkatan" id="angkatan" className="border border-gray-200 rounded-xl p-3 text-xs" type="text" placeholder="Cont: 2020, 2021.." value={formik.values.angkatan} onChange={handleInputForm} required />
      <p className="text-xs text-red-800">{formik.errors.angkatan}</p>

      <label htmlFor="dosen_id">Dosen Wali</label>
      <select id="dosen_id" name="dosen_id" className="text-xs p-3 border border-gray-200 rounded-xl mb-1" value={formik.values.dosen_id} onChange={handleInputForm} required>
        <option defaultValue={null}>Pilih dosen wali</option>
        {dosenData.map((item) => (
          <option key={item.dosen_id} value={item.dosen_id}>
            {item.first_name} {item.last_name}
          </option>
        ))}
      </select>

      <div className="flex flex-col gap-2 relative">
        <label htmlFor="email">Email</label>
        <div className="absolute inset-y-11 start-0 flex items-center ps-3 pointer-events-none">
          <EmailIcon />
        </div>
        <input type="email" name="email" id="email" className="w-full ps-10 border border-gray-200 rounded-xl p-3 text-xs" placeholder="Email..." value={formik.values.email} onChange={handleInputForm} required />
        <p className="text-xs text-red-800">{formik.errors.email}</p>
      </div>
    </div>
  );
};

FormUpdateProfile.propTypes = {
  formik: PropTypes.object,
  handleInputForm: PropTypes.func,
};

export default FormUpdateProfile;
