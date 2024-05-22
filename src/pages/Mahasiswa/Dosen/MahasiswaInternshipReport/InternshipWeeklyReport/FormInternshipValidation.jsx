import { useFormik } from 'formik';
import * as yup from 'yup';
import { useInternshipContext } from '../../../../../hooks/useInternshipContext';
import { Spinner } from '../../../../../components/Icons';

const FormInternshipValidation = () => {
  const { loadingUpdate, handleUpdateStatus } = useInternshipContext();

  const formik = useFormik({
    initialValues: {
      lecturer_note: '',
      status: '',
    },
    onSubmit: (values) => {
      handleUpdateStatus(values);
    },
    validationSchema: yup.object().shape({
      lecturer_note: yup.string().required('Wajib diisi bila perlu direvisi'),
      status: yup.string().required(),
    }),
  });

  return (
    <form className="flex flex-col col-span-2" onSubmit={formik.handleSubmit}>
      <label htmlFor="lecturer_note" className="text-sm text-gray-400">
        Catatan <span className="text-red-600">*Wajib diisi bila dokumentasi magang tidak valid</span>
      </label>
      <textarea id="lecturer_note" name="lecturer_note" className="rounded-lg bg-gray-200 border-0 text-xs" rows={5} onChange={(e) => formik.setFieldValue(e.target.name, e.target.value)} />

      <div className="flex lg:flex-row flex-col gap-2 w-full mt-4">
        <button
          type="button"
          className="flex items-center justify-center h-10 lg:w-20 w-full bg-green-500 text-white rounded-md hover:bg-green-600 active:bg-green-700 duration-150 disabled:bg-green-200 disabled:cursor-default"
          onClick={() => handleUpdateStatus({ status: 'Disetujui', lecturer_note: '' })}
        >
          {loadingUpdate ? <Spinner /> : 'Validasi'}
        </button>

        <button type="submit" className="flex items-center justify-center h-10 lg:w-24 w-full bg-red-600 text-white rounded-md hover:bg-red-700 active:bg-red-800 duration-150 disabled:bg-red-200 disabled:cursor-default">
          {loadingUpdate ? <Spinner /> : 'Perlu direvisi'}
        </button>
      </div>
    </form>
  );
};

export default FormInternshipValidation;
