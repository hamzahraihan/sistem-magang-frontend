import { useInternshipContext } from '../../../hooks/useInternshipContext';
import PropTypes from 'prop-types';
import { useUserContext } from '../../../hooks/useUserContext';

const FormCreateInternship = ({ formik, allowedExt }) => {
  const { internFileInputRef, campusFileInputRef } = useInternshipContext();
  const { dosenData } = useUserContext();

  const handleInputValue = (event) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
  };

  return (
    <>
      <label htmlFor="dosen_id">Dosen Wali</label>
      <select id="dosen_id" name="dosen_id" className="text-sm p-3 border border-gray-200 rounded-xl " onChange={handleInputValue} required>
        <option defaultValue={null}>Pilih dosen wali</option>
        {dosenData.map((item) => (
          <option key={item.dosen_id} value={item.dosen_id}>
            {item.first_name} {item.last_name}
          </option>
        ))}
      </select>

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
