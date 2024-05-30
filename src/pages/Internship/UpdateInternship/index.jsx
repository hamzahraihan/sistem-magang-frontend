import { Link, useParams } from 'react-router-dom';
import { ArrowIcon } from '../../../components/Icons';
import { useInternshipContext } from '../../../hooks/useInternshipContext';
import FormUpdateInternship from './FormUpdateInternship';
import SidebarUpdateInternship from './SidebarUpdateInternship';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useFetchInternshipById from '../../../features/internship/useFetchInternshipById';
import { useEffect } from 'react';

const UpdateInternship = () => {
  const { handleFileUpdate } = useInternshipContext();
  const { internshipByID } = useFetchInternshipById();
  const { internship_id } = useParams();
  const validFileExt = { files: ['doc', 'docx', 'pdf'] };
  console.log('🚀 ~ UpdateInternship ~ internshipByID:', internshipByID);
  const isValidFileType = (fileName) => {
    return fileName && validFileExt['files'].indexOf(fileName.split('.').pop()) > -1;
  };

  function getAllowedExt() {
    return validFileExt['files'].map((e) => `.${e}`).toString();
  }
  const allowedExt = getAllowedExt();

  const MAX_FILE_SIZE = 10485760; //max 10 mb file size

  useEffect(() => {
    formik.setValues({
      instance: internshipByID.instance,
      location: internshipByID.location,
      type: internshipByID.type,
      description: internshipByID.description,
      phone: internshipByID.phone,
      intern_agreement: internshipByID.intern_agreement,
      lecture_agreement: internshipByID.lecture_agreement,
      campus_approval: internshipByID.campus_approval,
    });
  }, [internshipByID]);

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
      handleFileUpdate(values);
    },
    validationSchema: yup.object().shape({
      instance: yup.string().required(),
      location: yup.string().required(),
      type: yup.string().required(),
      description: yup.string(),
      phone: yup.string().required(),
      intern_agreement: yup
        .mixed()
        .required('Wajib diisi')
        .test('is-valid-type', `Format file salah, file harus berformat .${allowedExt}`, (value) => {
          if (value == internshipByID.intern_agreement) return true;
          return isValidFileType(value?.name?.toLowerCase());
        })
        .test('is-valid-size', 'Max allowed size is 10 mb', (value) => {
          if (value == internshipByID.intern_agreement) return true;
          return value?.size <= MAX_FILE_SIZE;
        }),
      lecture_agreement: yup
        .mixed()
        .required('Wajib diisi')
        .test('is-valid-type', `Format file salah, file harus berformat .${allowedExt}`, (value) => {
          if (value == internshipByID.lecture_agreement) return true;
          return isValidFileType(value?.name?.toLowerCase());
        })
        .test('is-valid-size', 'Max allowed size is 10 mb', (value) => {
          if (value == internshipByID.lecture_agreement) return true;
          return value?.size <= MAX_FILE_SIZE;
        }),
      campus_approval: yup
        .mixed()
        .required('Wajib diisi')
        .test('is-valid-type', `Format file salah, file harus berformat .${allowedExt}`, (value) => {
          if (value == internshipByID.campus_approval) return true;
          return isValidFileType(value?.name?.toLowerCase());
        })
        .test('is-valid-size', 'Max allowed size is 10 mb', (value) => {
          if (value == internshipByID.campus_approval) return true;
          return value?.size <= MAX_FILE_SIZE;
        }),
    }),
  });

  return (
    <form className="grid grid-cols-3 gap-5" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-4 lg:col-span-2 col-span-3">
        <div className="flex flex-col gap-2 text-base ">
          <Link to={`/kegiatan-magang/detail/${internship_id}`} className="lg:flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white hidden">
            <ArrowIcon />
          </Link>
          <FormUpdateInternship formik={formik} allowedExt={allowedExt} />
        </div>
      </div>
      <SidebarUpdateInternship />
    </form>
  );
};

export default UpdateInternship;
