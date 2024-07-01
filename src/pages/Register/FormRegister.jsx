import { Link } from 'react-router-dom';
import { EmailIcon, PasswordIcon } from '../../components/Icons';
import PrimaryButton from '../../components/PrimaryButton';
import { useUserContext } from '../../hooks/useUserContext';
import { useFormik } from 'formik';
import * as yup from 'yup';

const FormRegister = () => {
  const { dosenData, handleRegisterAccount, loadingRegister } = useUserContext();

  const formik = useFormik({
    initialValues: {
      dosen_id: '',
      first_name: '',
      last_name: '',
      gender: '',
      email: '',
      nim: '',
      status: 'Belum magang',
      angkatan: '',
      kelas: '',
      password: '',
    },
    onSubmit: (values) => {
      handleRegisterAccount(values);
    },
    validationSchema: yup.object().shape({
      dosen_id: yup.number().required('Pilih dosen wali'),
      first_name: yup.string().required('Wajib diisi'),
      last_name: yup.string().required('Wajib diisi'),
      gender: yup.string().required('Wajib diisi'),
      email: yup
        .string()
        .required('Email wajib diisi')
        .email()
        .test('is-student-unsika', 'Email wajib menggunakan @student.unsika.ac.id', (value) => {
          if (value) {
            const [, domain] = value.split('@');
            return domain === 'student.unsika.ac.id';
          }
          return false;
        }),
      nim: yup.string().required('NIM perlu diisi'),
      angkatan: yup.string().required('Angkatan wajib diisi'),
      kelas: yup.string().required('Kelas wajib diisi'),
      password: yup.string().required('Password wajib diisi'),
    }),
  });

  const handleInputForm = (event) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex flex-col w-60 text-center gap-2">
        <p className="font-bold">Buat akun</p>
        <p className="text-xs text-gray-400">Silahkan isi data dirimu untuk membuat akun magang mandiri</p>
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

        <label htmlFor="dosen_id">Dosen Wali</label>
        <select id="dosen_id" name="dosen_id" className="text-xs p-3 border border-gray-200 rounded-xl " onChange={handleInputForm} required>
          <option defaultValue={null}>Pilih dosen wali</option>
          {dosenData.map((item) => (
            <option key={item.dosen_id} value={item.dosen_id}>
              {item.first_name} {item.last_name}
            </option>
          ))}
        </select>

        <div className="flex flex-col relative">
          <label htmlFor="email">Email</label>
          <div className="absolute inset-y-11 start-0 flex items-center ps-3 pointer-events-none">
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
        <div className="mt-auto">
          <PrimaryButton loading={loadingRegister} text={'Register'} type={'submit'} />
        </div>
      </form>
    </div>
  );
};

export default FormRegister;
