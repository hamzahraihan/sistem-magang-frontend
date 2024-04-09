import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../../components/Icons';
import SidebarUpdate from './Sidebar/SidebarUpdate';
import FormUpdateProfile from './FormUpdateProfile';
import { useFormik } from 'formik';
import * as yup from 'yup';

const UpdateProfile = () => {
  const formik = useFormik({
    initialValues: {
      dosen_id: '',
      first_name: '',
      last_name: '',
      email: '',
      nim: '',
      jurusan: '',
      angkatan: '',
      kelas: '',
      password: '',
      image: '',
      gender: '',
      phone: '',
    },
    onSubmit: () => {},
    validationSchema: yup.object().shape({
      dosen_id: yup.number().required('Dosen wajib diisi'),
      first_name: yup.string().required('Nama depan wajib diisi'),
      last_name: yup.string().required('Nama belakang wajib diisi'),
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
      nim: yup.string().required('NIM wajib diisi'),
      angkatan: yup.string().required('Angkatan wajib diisi'),
      kelas: yup.string().required('Kelas wajib diisi'),
      password: yup.string().required('Password wajib diisi'),
      image: yup.string(),
      gender: yup.string(),
      phone: yup.string(),
    }),
  });

  const handleInputForm = (event) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
  };

  return (
    <div className="col-span-3 pb-10">
      <form className="grid grid-cols-3 gap-5" onSubmit={formik.handleSubmit}>
        <div className="lg:order-first flex flex-col gap-4 lg:col-span-2 col-span-3 order-last">
          <Link to="/" className="lg:flex hidden items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all">
            <ArrowIcon />
          </Link>
          <h1 className="text-xl font-bold">Ubah profil</h1>
          <FormUpdateProfile formik={formik} handleInputForm={handleInputForm} />
        </div>
        <SidebarUpdate />
      </form>
    </div>
  );
};

export default UpdateProfile;
