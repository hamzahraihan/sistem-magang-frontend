import { EmailIcon } from '../../../components/Icons';
import { useUserContext } from '../../../hooks/useUserContext';
import PropTypes from 'prop-types';

const FormUpdateProfile = ({ formik, handleInputForm, allowedExt }) => {
  const { dosenData, imageInputRef } = useUserContext();

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

      <h1>Jenis Kelamin</h1>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <input id="default-radio-1" name="gender" type="radio" value="laki-laki" className="w-4 h-4  bg-gray-100 border-gray-300 duration-150" checked={formik.values.gender === 'laki-laki'} onChange={handleInputForm} />
          <label htmlFor="default-radio-1">Laki-Laki</label>
        </div>
        <div className="flex items-center gap-1">
          <input id="default-radio-2" name="gender" type="radio" value="perempuan" className="w-4 h-4  bg-gray-100 border-gray-300 duration-150" checked={formik.values.gender === 'perempuan'} onChange={handleInputForm} />
          <label htmlFor="default-radio-2">Perempuan</label>
        </div>
      </div>

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

      <div className="flex flex-col gap-2 ">
        <label htmlFor="phone">Nomor WhatsApp</label>
        <input type="number" name="phone" id="phone" className="w-full border border-gray-200 rounded-xl p-3 text-xs" placeholder="Kontak..." value={formik.values.phone} onChange={handleInputForm} required />
        <p className="text-xs text-red-800">{formik.errors.phone}</p>
      </div>

      <label htmlFor="gambar-profil">Gambar profil</label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer  focus:outline-none "
        id="image"
        name="image"
        type="file"
        accept={allowedExt}
        onChange={(e) => formik.setFieldValue(e.target.name, e.currentTarget.files[0])}
        ref={imageInputRef}
      />
      <p className="text-xs text-red-800">{formik.errors.image}</p>
    </div>
  );
};

FormUpdateProfile.propTypes = {
  formik: PropTypes.object,
  handleInputForm: PropTypes.func,
  allowedExt: PropTypes.string,
};

export default FormUpdateProfile;
