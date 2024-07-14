import { Datepicker } from 'flowbite-react';
import PropTypes from 'prop-types';
import { useInternshipContext } from '../../../../hooks/useInternshipContext';
import { useUserContext } from '../../../../hooks/useUserContext';

const FormRequestInternship = ({ formik, allowedExt }) => {
  const { lectureFileInputRef } = useInternshipContext();

  const { dosenData } = useUserContext();

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleBirthDateChange = (date) => {
    const formattedDate = formatDate(date);
    formik.setFieldValue('dateofbirth', formattedDate);
  };

  const handleStartDateChange = (date) => {
    const formattedDate = formatDate(date);
    formik.setFieldValue('start_intern', formattedDate);
  };

  const handleEndDateChange = (date) => {
    const formattedDate = formatDate(date);
    formik.setFieldValue('end_intern', formattedDate);
  };

  const handleInputValue = (event) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
  };

  return (
    <>
      <h1 className="text-gray-400">Data diri Mahasiswa</h1>

      <label htmlFor="dosen_id">Dosen Wali</label>
      <select id="dosen_id" name="dosen_id" className="text-sm p-3 border border-gray-200 rounded-xl " onChange={handleInputValue} required>
        <option defaultValue={null}>Pilih dosen wali</option>
        {dosenData.map((item) => (
          <option key={item.dosen_id} value={item.dosen_id}>
            {item.first_name} {item.last_name}
          </option>
        ))}
      </select>
      <p className="text-xs text-red-800">{formik.errors.dosen_id}</p>

      <label htmlFor="phone">Nomor Whatsapp</label>
      <input className="rounded-lg border border-gray-300" type="number" name="phone" id="phone" placeholder="Kontak" value={formik.values.phone} onChange={handleInputValue} required />
      <p className="text-xs text-red-800">{formik.errors.phone}</p>

      <label htmlFor="mahasiswa_address">Alamat Mahasiswa</label>
      <input className="rounded-lg border border-gray-300" type="text" name="mahasiswa_address" id="mahasiswa_address" placeholder="Alamat Mahasiswa" value={formik.values.mahasiswa_address} onChange={handleInputValue} required />
      <p className="text-xs text-red-800">{formik.errors.mahasiswa_address}</p>

      <label htmlFor="placeofbirth">Tempat lahir</label>
      <input className="rounded-lg border border-gray-300" type="text" name="placeofbirth" id="placeofbirth" placeholder="Tempat lahir" value={formik.values.placeofbirth} onChange={handleInputValue} required />
      <p className="text-xs text-red-800">{formik.errors.placeofbirth}</p>

      <label htmlFor="dateofbirth">Tanggal lahir</label>
      <Datepicker name="dateofbirth" id="dateofbirth" language="id-ID" labelTodayButton="Hari ini" showClearButton={false} onSelectedDateChanged={handleBirthDateChange} required />
      <p className="text-xs text-red-800">{formik.errors.dateofbirth}</p>

      <label htmlFor="religion">Agama</label>
      <input className="rounded-lg border border-gray-300" type="text" name="religion" id="religion" placeholder="Agama" value={formik.values.religion} onChange={handleInputValue} required />
      <p className="text-xs text-red-800">{formik.errors.religion}</p>

      <h1 className="text-gray-400">Form Perusahaan</h1>

      <label htmlFor="type_internship">Tipe magang</label>
      <select name="type_internship" className="text-base block w-full border border-gray-300 rounded-lg" value={formik.values.type_internship} onChange={handleInputValue}>
        <option defaultValue="magang">Pilih tipe magang</option>
        <option value="perusahaan">Magang Perusahaan</option>
        <option value="kompetisi">Magang Kompetisi</option>
      </select>
      <p className="text-xs text-red-800">{formik.errors.type_internship}</p>

      <label htmlFor="instance">Nama perusahaan / instansi</label>
      <input className="rounded-lg border border-gray-300" type="text" name="instance" id="instance" placeholder="Deskripsi" value={formik.values.instance} onChange={handleInputValue} required />
      <p className="text-xs text-red-800">{formik.errors.instance}</p>

      <label htmlFor="instance_address">Alamat perusahaan / instansi</label>
      <input className="rounded-lg border border-gray-300" type="text" name="instance_address" id="instance_address" placeholder="Alamat perusahaan / instansi" value={formik.values.instance_address} onChange={handleInputValue} required />
      <p className="text-xs text-red-800">{formik.errors.instance_address}</p>

      <label htmlFor="letter_receiver">Penerima / Tujuan surat</label>
      <input className="rounded-lg border border-gray-300" type="text" name="letter_receiver" id="letter_receiver" placeholder="Contoh: Manajer HRD" value={formik.values.letter_receiver} onChange={handleInputValue} required />
      <p className="text-xs text-red-800">{formik.errors.letter_receiver}</p>

      <label htmlFor="description">Deskripsi perusahaan</label>
      <input className="rounded-lg border border-gray-300" type="text" name="description" id="description" placeholder="Deskripsi" value={formik.values.description} onChange={handleInputValue} required />
      <p className="text-xs text-red-800">{formik.errors.description}</p>

      <label htmlFor="instance_contact">Kontak perusahaan</label>
      <input className="rounded-lg border border-gray-300" type="text" name="instance_contact" id="instance_contact" placeholder="Kontak" value={formik.values.instance_contact} onChange={handleInputValue} required />
      <p className="text-xs text-red-800">{formik.errors.instance_contact}</p>

      <label htmlFor="typeofbusiness">Jenis Badan Usaha</label>
      <select name="typeofbusiness" className="text-base block w-full border border-gray-300 rounded-lg" value={formik.values.typeofbusiness} onChange={handleInputValue}>
        <option defaultValue="magang">Pilih jenis badan usaha</option>
        <option value="Perseroan Terbatas (PT)">Perseroan Terbatas (PT)</option>
        <option value="Commanditaire Vennotschaap (CV)">Commanditaire Vennotschaap (CV)</option>
        <option value="Firma">Firma</option>
        <option value="Instansi Pemerintah">Instansi Pemerintah</option>
        <option value="Badan Penelitian">Badan Penelitian</option>
        <option value="Instansi Pendidikan">Instansi Pendidikan</option>
      </select>
      <p className="text-xs text-red-800">{formik.errors.typeofbusiness}</p>

      <label htmlFor="start_intern">Tanggal mulai</label>
      <Datepicker name="start_intern" id="start_intern" language="id-ID" labelTodayButton="Hari ini" showClearButton={false} onSelectedDateChanged={handleStartDateChange} required />
      <p className="text-xs text-red-800">{formik.errors.start_intern}</p>

      <label htmlFor="end_intern">Tanggal akhir</label>
      <Datepicker name="end_intern" id="end_intern" language="id-ID" labelTodayButton="Hari ini" showClearButton={false} onSelectedDateChanged={handleEndDateChange} required />
      <p className="text-xs text-red-800">{formik.errors.end_intern}</p>

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
    </>
  );
};

FormRequestInternship.propTypes = {
  formik: PropTypes.any,
  allowedExt: PropTypes.any,
};

export default FormRequestInternship;
