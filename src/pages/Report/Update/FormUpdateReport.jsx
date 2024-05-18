import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useReportInternContext } from '../../../hooks/useReportInternContext';
import PropTypes from 'prop-types';
import PrimaryButton from '../../../components/PrimaryButton';

const FormUpdateReport = ({ formik, getAllowedExt }) => {
  const allowedExt = getAllowedExt('file');

  const { internCompletedFileInputRef, finalReportFileInputRef, internScoreFileInputRef, loadingUpload } = useReportInternContext();

  return (
    <div className="flex flex-col gap-2 text-base">
      <label htmlFor="title">Judul</label>
      <input className="rounded-lg border border-gray-300" type="text" name="title" id="title" placeholder="Masukkan judul laporan akhir " onChange={(e) => formik.setFieldValue(e.target.name, e.target.value)} />
      <p className="text-xs text-red-800">{formik.errors.title}</p>

      <label htmlFor="note">Keterangan laporan</label>
      <ReactQuill theme="snow" id="note" value={formik.values.note} onChange={(e) => formik.setFieldValue('note', e)} className="pb-10" />
      <p className="text-xs text-red-800">{formik.errors.note}</p>

      <label htmlFor="file_url">Surat selesai magang</label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer  focus:outline-none "
        id="file_url"
        name="intern_complete_file"
        type="file"
        accept={allowedExt}
        onChange={(e) => formik.setFieldValue(e.target.name, e.currentTarget.files[0])}
        ref={internCompletedFileInputRef}
      />
      <p className="text-xs text-red-800">{formik.errors.intern_complete_file}</p>

      <label htmlFor="file_url">Penilaian dari perushaan</label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer  focus:outline-none "
        id="file_url"
        name="intern_score_file"
        accept={allowedExt}
        onChange={(e) => formik.setFieldValue(e.target.name, e.currentTarget.files[0])}
        type="file"
        ref={internScoreFileInputRef}
      />
      <p className="text-xs text-red-800">{formik.errors.intern_score_file}</p>

      <label htmlFor="file_url">Laporan akhir magang</label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer  focus:outline-none "
        id="file_url"
        type="file"
        name="intern_final_report"
        accept={allowedExt}
        onChange={(e) => formik.setFieldValue(e.target.name, e.currentTarget.files[0])}
        ref={finalReportFileInputRef}
      />
      <p className="text-xs text-red-800">{formik.errors.intern_final_report}</p>

      <div className="lg:hidden block pt-4">
        <PrimaryButton type="submit" text={'Kirim laporan'} loading={loadingUpload} />
      </div>
    </div>
  );
};

FormUpdateReport.propTypes = {
  formik: PropTypes.object,
  getAllowedExt: PropTypes.func,
};

export default FormUpdateReport;
