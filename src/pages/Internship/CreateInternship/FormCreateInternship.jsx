import { useInternshipContext } from '../../../hooks/useInternshipContext';
import PropTypes from 'prop-types';

const FormCreateInternship = ({ formik, allowedExt }) => {
  const { internFileInputRef, campusFileInputRef } = useInternshipContext();

  return (
    <>
      <label htmlFor="campus_approval">Surat permohonan magang dari kampus</label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer  focus:outline-none "
        id="campus_approval"
        type="file"
        name="campus_approval"
        accept={allowedExt}
        onChange={(e) => formik.setFieldValue(e.target.name, e.currentTarget.files[0])}
        ref={campusFileInputRef}
      />
      <p className="text-xs text-red-800">{formik.errors.campus_approval}</p>

      <label htmlFor="intern_agreement">Surat magang dari perusahaan</label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer  focus:outline-none "
        id="intern_agreement"
        type="file"
        name="intern_agreement"
        accept={allowedExt}
        onChange={(e) => formik.setFieldValue(e.target.name, e.currentTarget.files[0])}
        ref={internFileInputRef}
      />
      <p className="text-xs text-red-800">{formik.errors.intern_agreement}</p>
    </>
  );
};

FormCreateInternship.propTypes = {
  formik: PropTypes.any,
  allowedExt: PropTypes.any,
};

export default FormCreateInternship;
