import { useFormik } from 'formik';
import * as yup from 'yup';
import { EmailIcon } from '../../components/Icons';
import PrimaryButton from '../../components/PrimaryButton';
import { useUserContext } from '../../hooks/useUserContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Form = () => {
  const { user, userLoggedInData, loading, handleForgotPassword } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if ((user && user.length > 0) || userLoggedInData) {
      navigate('/');
    }
  }, [navigate, user, userLoggedInData]);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: (values) => {
      handleForgotPassword(values);
    },
    validationSchema: yup.object().shape({
      email: yup.string().required('Email wajib diisi').email('Email tidak valid'),
    }),
  });

  return (
    <div className="flex flex-col h-full w-full items-center">
      <div className="flex flex-col w-72 text-center gap-2">
        <h1 className="font-bold ">Lupa Password</h1>
        <p className="text-xs text-gray-400">Silahkan isi email yang kamu gunakan untuk akun magang mandiri dan kami akan kirimkan link untuk reset password</p>
      </div>
      <form className="flex flex-col w-full" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col relative gap-2">
          <label htmlFor="email">Email</label>
          <div className="absolute inset-y-12 pt-1 start-0 flex items-center ps-3 pointer-events-none">
            <EmailIcon />
          </div>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full ps-10 border border-gray-200 rounded-xl p-3 text-xs"
            placeholder="Email..."
            value={formik.values.email}
            onChange={(e) => formik.setFieldValue(e.target.name, e.target.value)}
            required
          />
        </div>
        <p className="text-xs text-red-800 pt-2">{formik.errors.email}</p>
        <div className="mt-2">
          <PrimaryButton loading={loading} type="submit" text="Kirim email" />
        </div>
      </form>
    </div>
  );
};

export default Form;
