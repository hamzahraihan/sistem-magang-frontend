import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../../components/Icons';
import FormCreateInternship from './FormCreateInternship';
import SidebarCreateIntenship from './SidebarCreateInternship';
import { useInternshipContext } from '../../../hooks/useInternshipContext';
import * as yup from 'yup';
import { useFormik } from 'formik';

const CreateInternship = () => {
  const { handleCreateInternship, loading } = useInternshipContext();

  const validFileExt = { files: ['doc', 'docx', 'pdf', 'jpg'] };
  const isValidFileType = (fileName) => {
    return fileName && validFileExt['files'].indexOf(fileName.split('.').pop()) > -1;
  };

  function getAllowedExt() {
    return validFileExt['files'].map((e) => `.${e}`).toString();
  }
  const allowedExt = getAllowedExt();

  const MAX_FILE_SIZE = 10485760; //max 10 mb file size

  const formik = useFormik({
    initialValues: {
      instance: '',
      location: '',
      type: '',
      description: '',
      phone: '',
      intern_agreement: null,
      lecture_agreement: null,
      campus_approval: null,
    },
    onSubmit: (values) => {
      handleCreateInternship(values);
    },
    validationSchema: yup.object().shape({
      instance: yup.string().required(),
      location: yup.string().required().max(255),
      type: yup.string().required(),
      description: yup.string().max(255),
      phone: yup.string().required(),
      intern_agreement: yup
        .mixed()
        .required('Wajib diisi')
        .test('is-valid-type', `Format file salah, file harus berformat .${allowedExt}`, (value) => {
          return isValidFileType(value?.name?.toLowerCase());
        })
        .test('is-valid-size', 'Max allowed size is 10 mb', (value) => {
          return value?.size <= MAX_FILE_SIZE;
        }),
      lecture_agreement: yup
        .mixed()
        .required('Wajib diisi')
        .test('is-valid-type', `Format file salah, file harus berformat .${allowedExt}`, (value) => {
          return isValidFileType(value?.name?.toLowerCase());
        })
        .test('is-valid-size', 'Max allowed size is 10 mb', (value) => {
          return value?.size <= MAX_FILE_SIZE;
        }),
      campus_approval: yup
        .mixed()
        .required('Wajib diisi')
        .test('is-valid-type', `Format file salah, file harus berformat .${allowedExt}`, (value) => {
          return isValidFileType(value?.name?.toLowerCase());
        })
        .test('is-valid-size', 'Max allowed size is 10 mb', (value) => {
          return value?.size <= MAX_FILE_SIZE;
        }),
    }),
  });
  return (
    <form className="grid grid-cols-3 gap-5" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-4 lg:col-span-2 col-span-3">
        <div className="flex flex-col gap-2 text-base ">
          <Link to="/kegiatan-magang" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white">
            <ArrowIcon />
          </Link>
          <FormCreateInternship formik={formik} allowedExt={allowedExt} />
        </div>
      </div>
      <SidebarCreateIntenship loading={loading} />
    </form>
  );
};

export default CreateInternship;
