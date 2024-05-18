import { Link, useParams } from 'react-router-dom';
import { ArrowIcon } from '../../../components/Icons';
import SidebarUploadReport from '../Upload/SidebarUploadReport';
import FormUpdateReport from './FormUpdateReport';
import * as yup from 'yup';
import { useReportInternContext } from '../../../hooks/useReportInternContext';
import { useFormik } from 'formik';
import _ from 'lodash';
import useFetchReportById from '../../../features/report/useFetchReportById';

const ReportUpdateForm = () => {
  const { handleFileUpdate } = useReportInternContext();
  const { reportIntern } = useFetchReportById();

  const validFileExt = { files: ['doc', 'docx', 'pdf'] };
  const isValidFileType = (fileName) => {
    return fileName && validFileExt['files'].indexOf(fileName.split('.').pop()) > -1;
  };

  function getAllowedExt() {
    return validFileExt['files'].map((e) => `.${e}`).toString();
  }
  const allowedExt = getAllowedExt();

  const { report_id } = useParams();
  console.log('🚀 ~ ReportUpdateForm ~ report_id:', report_id);

  const MAX_FILE_SIZE = 10485760; //max 10 mb file size

  const formik = useFormik({
    initialValues: {
      report_id: _.toInteger(report_id),
      title: '',
      note: '',
      intern_complete_file: null,
      intern_score_file: null,
      intern_final_report: null,
    },
    onSubmit: (values) => {
      handleFileUpdate(values);
    },
    validationSchema: yup.object().shape({
      report_id: yup.number().required(),
      title: yup.string().required('Wajib diisi'),
      note: yup.string().required('Wajib diisi'),
      intern_complete_file: yup
        .mixed()
        .required('Wajib diisi')
        .test('is-valid-type', `Format file salah, file harus berformat .${allowedExt}`, (value) => {
          if (value == reportIntern.intern_complete_file) return true;
          return isValidFileType(value?.name?.toLowerCase());
        })
        .test('is-valid-size', 'Max allowed size is 10 mb', (value) => value?.size <= MAX_FILE_SIZE),
      intern_score_file: yup
        .mixed()
        .required('Wajib diisi')
        .test('is-valid-type', `Format file salah, file harus berformat .${allowedExt}`, (value) => {
          if (value == reportIntern.intern_score_file) return true;
          return isValidFileType(value?.name?.toLowerCase());
        })
        .test('is-valid-size', 'Max allowed size is 10 mb', (value) => value?.size <= MAX_FILE_SIZE),
      intern_final_report: yup
        .mixed()
        .required('Wajib diisi')
        .test('is-valid-type', `Format file salah, file harus berformat .${allowedExt}`, (value) => {
          if (value == reportIntern.intern_score_file) return true;
          return isValidFileType(value?.name?.toLowerCase());
        })
        .test('is-valid-size', 'Max allowed size is 10 mb', (value) => value?.size <= MAX_FILE_SIZE),
    }),
  });
  return (
    <div className="col-span-3 pb-10">
      <form className="grid grid-cols-3 gap-5">
        <div className="lg:order-first flex flex-col gap-4 lg:col-span-2 col-span-3 order-last">
          <Link to={`/report/detail/${report_id}`} className="lg:flex hidden items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white">
            <ArrowIcon />
          </Link>
          <h1 className="text-xl font-bold">Ubah laporan</h1>
          <FormUpdateReport formik={formik} getAllowedExt={getAllowedExt} />
        </div>
        <SidebarUploadReport />
      </form>
    </div>
  );
};

export default ReportUpdateForm;
