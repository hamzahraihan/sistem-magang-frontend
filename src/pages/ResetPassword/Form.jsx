import { useFormik } from 'formik';
import * as yup from 'yup';
import { PasswordIcon } from '../../components/Icons';
import PrimaryButton from '../../components/PrimaryButton';
import { useUserContext } from '../../hooks/useUserContext';

const Form = () => {
  const { loading, handleResetPassword } = useUserContext();

  const formik = useFormik({
    initialValues: {
      newPassword: '',
    },
    onSubmit: (values) => {
      handleResetPassword(values);
    },
    validationSchema: yup.object().shape({
      newPassword: yup.string().required('Password wajib diisi'),
    }),
  });

  return (
    <div className="w-80">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col relative">
          <label htmlFor="newPassword">Password Baru</label>
          <div className="absolute inset-y-11 start-0 flex items-center ps-3 pointer-events-none">
            <PasswordIcon />
          </div>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            className="w-full ps-10 border border-gray-200 rounded-xl p-3 text-xs"
            placeholder="Password..."
            value={formik.values.newPassword}
            onChange={(e) => formik.setFieldValue(e.target.name, e.target.value)}
            required
          />
        </div>
        <p className="text-xs text-red-800">{formik.errors.newPassword}</p>

        <div className="mt-2">
          <PrimaryButton loading={loading} type="submit" text="Ubah password" />
        </div>
      </form>
    </div>
  );
};

export default Form;
