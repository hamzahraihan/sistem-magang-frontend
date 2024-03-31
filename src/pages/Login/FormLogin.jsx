import { Link, useParams } from 'react-router-dom';
import { EmailIcon, PasswordIcon } from '../../components/Icons';
import PrimaryButton from '../../components/PrimaryButton';
import { useUserContext } from '../../hooks/useUserContext';
import { useFormik } from 'formik';
import * as yup from 'yup';

const FormLogin = () => {
  const { loading, setloading, role, handleLogin } = useUserContext();

  const { roleUrl } = useParams();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      handleLogin(values);
    },
    validationSchema: yup.object().shape({
      email: yup.string().required('Email wajib diisi').email(),
      // .test('is-student-unsika', 'Email wajib menggunakan @student.unsika.ac.id', (value) => {
      //   if (value) {
      //     const [, domain] = value.split('@');
      //     return domain === 'student.unsika.ac.id';
      //   }
      //   return false;
      // }),
      password: yup.string().required('Password wajib diisi'),
    }),
  });

  const handleInputForm = (event) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
  };

  return (
    <div className="flex flex-col h-full gap-4 items-center">
      <div className="flex flex-col w-60 text-center gap-2">
        <p className="font-bold">Masuk dengan akun {role.roleChoice ? role.roleChoice : roleUrl}</p>
        <p className="text-xs text-gray-400">Silahkan isi data dirimu untuk membuat akun magang mandiri</p>
      </div>

      <form className="flex flex-col gap-3 w-full h-full" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col relative">
          <label htmlFor="email">Email</label>
          <div className="absolute inset-y-11 start-0 flex items-center ps-3 pointer-events-none">
            <EmailIcon />
          </div>
          <input type="email" name="email" id="email" className="w-full ps-10 border border-gray-200 rounded-xl p-3 text-xs" placeholder="Email..." value={formik.values.email} onChange={handleInputForm} required />
          <p className="text-xs text-red-800">{formik.errors.email}</p>
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="password">Password</label>
          <div className="absolute inset-y-11 start-0 flex items-center ps-3 pointer-events-none">
            <PasswordIcon />
          </div>
          <input type="password" name="password" id="password" className="w-full ps-10 border border-gray-200 rounded-xl p-3 text-xs" placeholder="Password..." value={formik.values.password} onChange={handleInputForm} required />
        </div>
        <p className="text-xs text-red-800">{formik.errors.password}</p>

        <Link className="text-xs text-teal-500 hover:no-underline underline" to="/register">
          Belum punya akun?
        </Link>
        <div className="mt-auto">
          <PrimaryButton loading={loading} setloading={setloading} text={'Login'} />
        </div>
      </form>
    </div>
  );
};

export default FormLogin;
