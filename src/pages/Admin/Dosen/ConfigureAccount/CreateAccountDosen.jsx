import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { ArrowIcon, EmailIcon, PasswordIcon } from '../../../../components/Icons';

import * as yup from 'yup';
import PrimaryButton from '../../../../components/PrimaryButton';
import { useDosenContext } from '../../../../hooks/useDosenContext';

const CreateAccountDosen = () => {
  const { loading, handleCreateDosenAccount } = useDosenContext();
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      role: 'dosen',
      nidn: '',
      gender: '',
      phone: '',
      password: '',
    },
    onSubmit: (values) => {
      handleCreateDosenAccount(values);
    },
    validationSchema: yup.object().shape({
      first_name: yup.string().required(),
      last_name: yup.string().required(),
      email: yup.string().required(),
      password: yup.string().required(),
      role: yup.string(),
      nidn: yup.number('NIDN tidak valid').required(),
      gender: yup.string(),
      phone: yup.number().required(),
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
      <h1 className="text-2xl font-bold mb-4">Buat akun Dosen Pembimbing</h1>
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

        <div className="flex flex-col">
          <label htmlFor="gender">Jenis Kelamin</label>
          <select id="gender" name="gender" className="text-xs p-3 border border-gray-200 rounded-xl " onChange={handleInputForm} required>
            <option defaultValue={null}>Pilih jenis kelamin</option>
            <option value="laki-laki">Laki-laki</option>
            <option value="perempuan">Perempuan</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="nidn">NIDN</label>
          <input name="nidn" id="nidn" className="border border-gray-200 rounded-xl p-3 text-xs" type="text" placeholder="NIDN" onChange={handleInputForm} required />
          <p className="text-xs text-red-800">{formik.errors.nidn}</p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone">Nomor Whatsapp</label>
          <input name="phone" id="phone" className="border border-gray-200 rounded-xl p-3 text-xs" type="text" placeholder="Nomor Whatsapp" onChange={handleInputForm} required />
          <p className="text-xs text-red-800">{formik.errors.phone}</p>
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
          <div className="absolute inset-y-9 start-0 flex items-center ps-3 pointer-events-none">
            <PasswordIcon />
          </div>
          <input type="password" name="password" id="password" className="w-full ps-10 border border-gray-200 rounded-xl p-3 text-xs" placeholder="Password..." onChange={handleInputForm} required />
          <p className="text-xs text-red-800">{formik.errors.password}</p>
        </div>

        <div className="mt-auto lg:w-32 lg:h-20 ">
          <PrimaryButton loading={loading} text="Buat Akun" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default CreateAccountDosen;
