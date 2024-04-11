import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../../components/Icons';
import SidebarUpdate from './Sidebar/SidebarUpdate';
import FormUpdateProfile from './FormUpdateProfile';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import FormUpdatePassword from './FormUpdatePassword';
import PrimaryButton from '../../../components/PrimaryButton';
import useFetchUserByID from '../../../features/user/useFetchUserById';

const UpdateProfile = () => {
  const [tab, setTab] = useState('profile');
  const { userByID } = useFetchUserByID();
  console.log('🚀 ~ UpdateProfile ~ userByID:', userByID);

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

  useEffect(() => {
    formik.setValues({
      dosen_id: userByID ? userByID.dosen_id : '',
      first_name: userByID ? userByID.first_name : '',
      last_name: userByID ? userByID.last_name : '',
      email: userByID ? userByID.email : '',
      nim: userByID ? userByID.nim : '',
      jurusan: userByID ? userByID.jurusan : '',
      angkatan: userByID ? userByID.angkatan : '',
      kelas: userByID ? userByID.kelas : '',
      password: userByID ? userByID.password : '',
      image: userByID ? userByID.image : '',
      gender: userByID ? userByID.gender : '',
      phone: userByID ? userByID.phone : '',
    });
  }, [userByID]);

  const handleInputForm = (event) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
  };

  const buttons = [
    { value: 'profile', name: 'Ubah profil' },
    { value: 'password', name: 'Ubah password' },
  ];

  return (
    <div className="col-span-3 pb-10">
      <form className="grid grid-cols-3 gap-5" onSubmit={formik.handleSubmit}>
        <div className="lg:order-first flex flex-col gap-4 lg:col-span-2 col-span-3 order-last">
          <Link to="/" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white">
            <ArrowIcon />
          </Link>
          <div className="flex gap-2">
            {buttons.map((btn) => (
              <button
                type="button"
                key={btn.value}
                className={`fl p-2 w-full rounded-xl border border-gray-200 bg-white  text-sm font-bold hover:bg-hoverColor ${
                  btn.value == tab && '!bg-primaryColor text-white hover:!bg-hoverColor'
                } hover:border-white hover:text-white duration-150`}
                onClick={() => setTab(btn.value)}
              >
                {btn.name}
              </button>
            ))}
          </div>
          {tab == 'profile' ? <FormUpdateProfile formik={formik} handleInputForm={handleInputForm} /> : <FormUpdatePassword />}

          {tab == 'profile' && (
            <div className="block lg:hidden">
              <PrimaryButton type="submit" text="Ubah profil" />
            </div>
          )}
          {tab == 'password' && (
            <div className="block lg:hidden">
              <PrimaryButton type="submit" text="Ubah password" />
            </div>
          )}
        </div>
        <SidebarUpdate tab={tab} />
      </form>
    </div>
  );
};

export default UpdateProfile;
