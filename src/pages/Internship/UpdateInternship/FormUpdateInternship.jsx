import { useInternshipContext } from '../../../hooks/useInternshipContext';
import PropTypes from 'prop-types';

const FormUpdateInternship = ({ formik, allowedExt }) => {
  const { internFileInputRef, campusFileInputRef, lectureFileInputRef } = useInternshipContext();

  const handleInputValue = (event) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
  };

  return (
    <>
      <label htmlFor="instance">Nama perusahaan</label>
      <input className="rounded-lg border border-gray-300" type="text" name="instance" id="instance" placeholder="Nama perusahaan" value={formik.values.instance} onChange={handleInputValue} required />
      <p className="text-xs text-red-800">{formik.errors.instance}</p>

      <label htmlFor="location">Lokasi perusahaan</label>
      <input className="rounded-lg border border-gray-300" type="text" name="location" id="location" placeholder="Lokasi" value={formik.values.location} onChange={handleInputValue} required />
      <p className="text-xs text-red-800">{formik.errors.location}</p>

      <label htmlFor="type">Tipe magang</label>
      <select name="type" className="text-base block w-full border border-gray-300 rounded-lg" value={formik.values.type} onChange={handleInputValue}>
        <option defaultValue="magang">Pilih tipe magang</option>
        <option value="perusahaan">Magang Perusahaan</option>
        <option value="kompetisi">Magang Kompetisi</option>
      </select>
      <p className="text-xs text-red-800">{formik.errors.type}</p>

      <label htmlFor="description">Deskripsi perusahaan</label>
      <input className="rounded-lg border border-gray-300" type="text" name="description" id="description" placeholder="Deskripsi" value={formik.values.description} onChange={handleInputValue} required />
      <p className="text-xs text-red-800">{formik.errors.description}</p>

      <label htmlFor="phone">Kontak perusahaan</label>
      <input className="rounded-lg border border-gray-300" type="text" name="phone" id="phone" placeholder="Kontak" value={formik.values.phone} onChange={handleInputValue} required />
      <p className="text-xs text-red-800">{formik.errors.phone}</p>

      <label htmlFor="lecture_agreement">Surat bersedia dosen magang</label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer  focus:outline-none "
        id="lecture_agreement"
        type="file"
        name="lecture_agreement"
        accept={allowedExt}
        onChange={(e) => formik.setFieldValue(e.target.name, e.currentTarget.files[0])}
        ref={lectureFileInputRef}
      />
      <p className="text-xs text-red-800">{formik.errors.lecture_agreement}</p>

      <label htmlFor="campus_approval">Surat magang dari kampus</label>
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

FormUpdateInternship.propTypes = {
  formik: PropTypes.any,
  allowedExt: PropTypes.any,
};

export default FormUpdateInternship;
