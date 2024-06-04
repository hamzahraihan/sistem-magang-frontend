import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { ArrowIcon, EmailIcon, PasswordIcon } from '../../../../components/Icons';

import * as yup from 'yup';

const CreateAccountDosen = () => {
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      role: 'dosen',
      nidn: '',
      jurusan: '',
      gender: '',
      phone: '',
    },
    onSubmit: (values) => {},
    validationSchema: yup.object().shape({
      first_name: yup.string().required(),
      last_name: yup.string().required(),
      email: yup.string().required(),
      role: yup.string(),
      nidn: yup.string(),
      gender: yup.string(),
      phone: yup.string(),
    }),
  });
  const handleInputForm = (event) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
  };
  return (
    <div className="flex flex-col lg:col-span-2 col-span-3">
      <div className="flex justify-between">
        <Link to="/dashboard/admin/dosen" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white mb-2">
          <ArrowIcon />
        </Link>
      </div>
      <form className="flex flex-col gap-3 w-full h-full" onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <label htmlFor="first_name">Nama Depan</label>
            <input name="first_name" id="first_name" className="border border-gray-200 rounded-xl p-3 text-xs" type="text" placeholder="Nama depan..." onChange={handleInputForm} required />
            <p className="text-xs text-red-800">{formik.errors.first_name}</p>
          </div>
          <div className="flex flex-col">
            <label htmlFor="last_name">Nama Belakang</label>
            <input name="last_name" id="last_name" className="border border-gray-200 rounded-xl p-3 text-xs" type="text" placeholder="Nama belakang..." onChange={handleInputForm} required />
            <p className="text-xs text-red-800">{formik.errors.last_name}</p>
          </div>
        </div>

        <label htmlFor="gender">Jenis Kelamin</label>
        <select id="gender" name="gender" className="text-xs p-3 border border-gray-200 rounded-xl " onChange={handleInputForm} required>
          <option defaultValue={null}>Pilih jenis kelamin</option>
          <option value="laki-laki">Laki-laki</option>
          <option value="perempuan">Perempuan</option>
        </select>

        <div className="flex flex-col">
          <label htmlFor="kelas">Kelas</label>
          <input name="kelas" id="kelas" className="border border-gray-200 rounded-xl p-3 text-xs" type="text" placeholder="Cont: 5B, 6A..." onChange={handleInputForm} required />
          <p className="text-xs text-red-800">{formik.errors.kelas}</p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="nim">NIM</label>
          <input name="nim" id="nim" className="border border-gray-200 rounded-xl p-3 text-xs" type="text" placeholder="nim" onChange={handleInputForm} required />
          <p className="text-xs text-red-800">{formik.errors.nim}</p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="angkatan">Angkatan</label>
          <input name="angkatan" id="angkatan" className="border border-gray-200 rounded-xl p-3 text-xs" type="text" placeholder="Cont: 2020, 2021.." onChange={handleInputForm} required />
          <p className="text-xs text-red-800">{formik.errors.angkatan}</p>
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="email">Email</label>
          <div className="absolute inset-y-9 start-0 flex items-center ps-3 pointer-events-none">
            <EmailIcon />
          </div>
          <input type="email" name="email" id="email" className="w-full ps-10 border border-gray-200 rounded-xl p-3 text-xs" placeholder="Email..." onChange={handleInputForm} required />
          <p className="text-xs text-red-800">{formik.errors.email}</p>
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="password">Password</label>
          <div className="absolute inset-y-11 start-0 flex items-center ps-3 pointer-events-none">
            <PasswordIcon />
          </div>
          <input type="password" name="password" id="password" className="w-full ps-10 border border-gray-200 rounded-xl p-3 text-xs" placeholder="Password..." onChange={handleInputForm} required />
          <p className="text-xs text-red-800">{formik.errors.password}</p>
        </div>

        <Link className="text-xs text-teal-500 hover:no-underline underline" to="/login">
          Sudah punya akun?
        </Link>
        {/* <div className="mt-auto">
          <PrimaryButton loading={loadingRegister} text={'Register'} type={'submit'} />
        </div> */}
      </form>
    </div>
  );
};

export default CreateAccountDosen;
