import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../../components/Icons';
import SidebarUpdate from './Sidebar/SidebarUpdate';
import FormUpdateProfile from './FormUpdateProfile';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import FormUpdatePassword from './FormUpdatePassword';
import useFetchUserByID from '../../../features/user/useFetchUserById';
import { useUserContext } from '../../../hooks/useUserContext';

const UpdateProfile = () => {
  const [tab, setTab] = useState('profile');
  const { userByID } = useFetchUserByID();
  const { handleUpdateProfile, handleUpdatePassword, loadingUpdate } = useUserContext();

  const validFileExt = { files: ['png', 'jpg', 'jpeg'] };
  const isValidFileType = (fileName) => {
    return fileName && validFileExt['files'].indexOf(fileName.split('.').pop()) > -1;
  };
  function getAllowedExt() {
    return validFileExt['files'].map((e) => `.${e}`).toString();
  }
  const allowedExt = getAllowedExt();

  const MAX_FILE_SIZE = 1048576; // maximum file size 1mb

  const formik = useFormik({
    initialValues: {
      dosen_id: '',
      first_name: '',
      last_name: '',
      email: '',
      nim: '',
      nidn: '',
      jurusan: '',
      angkatan: '',
      old_password: '',
      kelas: '',
      image: '',
      gender: '',
      phone: '',
    },
    onSubmit: (values) => {
      handleUpdateProfile(values);
    },
    validationSchema: yup.object().shape({
      dosen_id: yup.number().test('is-dosen-exist', 'Dosen wajib diisi', (value) => {
        if (userByID.role !== 'mahasiswa') return true;
        if (value) {
          return true;
        }
      }),
      first_name: yup.string().required('Nama depan wajib diisi'),
      last_name: yup.string().required('Nama belakang wajib diisi'),
      email: yup
        .string()
        .required('Email wajib diisi')
        .email()
        .test('is-student-unsika', 'Email wajib menggunakan @student.unsika.ac.id', (value) => {
          if (userByID.role !== 'mahasiswa') return true;
          if (value) {
            const [, domain] = value.split('@');
            return domain === 'student.unsika.ac.id';
          }
          return false;
        }),
      nim: yup.string().test('is-nim-student', 'NIM wajib diisi', (value) => userByID.role !== 'mahasiswa' || value == userByID.nim),
      nidn: yup.string(),
      angkatan: yup.string().test('is-angkatan-student', 'Angkatan wajib diisi', (value) => userByID.role !== 'mahasiswa' || value == userByID.angkatan),
      kelas: yup.string().test('is-kelas-student', 'Kelas wajib diisi', (value) => userByID.role !== 'mahasiswa' || value == userByID.kelas),
      image: yup
        .mixed()
        .test('fileType', `File harus berupa gambar dengan format, ${allowedExt}`, (value) => {
          if (value == userByID.image || !value) return true;
          return isValidFileType(value?.name);
        })
        .test('fileSize', 'Ukuran file terlalu besar', (value) => {
          if (value == userByID.image || !value) return true;
          return value?.size <= MAX_FILE_SIZE;
        }),
      gender: yup.string(),
      phone: yup.string().required('Kontak wajib diisi'),
    }),
  });

  const formikPassword = useFormik({
    initialValues: {
      password: '',
      old_password: '',
    },
    onSubmit: (values) => {
      handleUpdatePassword(values);
    },
    validationSchema: yup.object().shape({
      password: yup.string().required('Password wajib diisi'),
      old_password: yup.string().required('Password lama wajib diisi'),
    }),
  });

  useEffect(() => {
    formik.setValues({
      dosen_id: userByID ? userByID.dosen_id : '',
      first_name: userByID ? userByID.first_name : '',
      last_name: userByID ? userByID.last_name : '',
      email: userByID ? userByID.email : '',
      nim: userByID ? userByID.nim : '',
      nidn: userByID ? userByID.nidn : '',
      jurusan: userByID ? userByID.jurusan : '',
      angkatan: userByID ? userByID.angkatan : '',
      kelas: userByID ? userByID.kelas : '',
      image: userByID ? userByID.image : '',
      gender: userByID ? userByID.gender : '',
      phone: userByID ? userByID.phone : '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="grid grid-cols-3 gap-5">
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
          {tab == 'profile' ? <FormUpdateProfile user={userByID} formik={formik} handleInputForm={handleInputForm} allowedExt={allowedExt} /> : <FormUpdatePassword formikPassword={formikPassword} />}
        </div>
        <SidebarUpdate tab={tab} loading={loadingUpdate} formik={formik} formikPassword={formikPassword} />
      </div>
    </div>
  );
};

export default UpdateProfile;
