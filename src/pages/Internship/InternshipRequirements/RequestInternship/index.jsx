import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../../../components/Icons';
import FormRequestInternship from './FormRequestInternship';
import SidebarRequestInternship from './SidebarRequestInternship';
import { useFormik } from 'formik';
import * as yup from 'yup';

const RequestInternship = () => {
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
      mahasiswa_address: '',
      dateofbirth: '',
      religion: '',
      lecture_agreement: '',
      type_internship: '',
      instance: '',
      letter_receiver: '',
      instance_address: '',
      instance_contact: '',
      description: '',
      typeofbusiness: '',
      start_intern: '',
      end_intern: '',
    },
    onSubmit: () => {},
    validationSchema: yup.object().shape({
      mahasiswa_address: yup.string().required().max(255),
      dateofbirth: yup.date().required(),
      religion: yup.string().required().max(255),
      lecture_agreement: yup
        .mixed()
        .required('Wajib diisi')
        .test('is-valid-type', `Format file salah, file harus berformat .${allowedExt}`, (value) => {
          return isValidFileType(value?.name?.toLowerCase());
        })
        .test('is-valid-size', 'Max allowed size is 10 mb', (value) => {
          return value?.size <= MAX_FILE_SIZE;
        }),
      type_internship: yup.string().required().max(255),
      instance: yup.string().required().max(255),
      letter_receiver: yup.string().required().max(255),
      instance_address: yup.string().required().max(255),
      instance_contact: yup.string().required().max(20),
      description: yup.string().required().max(255),
      typeofbusiness: yup.string().required().max(255),
      start_intern: yup.date().required(),
      end_intern: yup.date().required(),
    }),
  });
  return (
    <form className="grid grid-cols-3 gap-5" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-4 lg:col-span-2 col-span-3">
        <div className="flex flex-col gap-2 text-base ">
          <Link to="/kegiatan-magang" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white">
            <ArrowIcon />
          </Link>
          <FormRequestInternship formik={formik} allowedExt={allowedExt} />
        </div>
      </div>
      <SidebarRequestInternship />
    </form>
  );
};

export default RequestInternship;
