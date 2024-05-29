import { useInternshipContext } from '../../../hooks/useInternshipContext';
import { Datepicker } from 'flowbite-react';

const FormUpdateInternship = () => {
  const { internFileInputRef, campusFileInputRef, lectureFileInputRef, setInternshipInputData, internshipInputData } = useInternshipContext();

  const handleStartDateChange = (date) => {
    setInternshipInputData({ ...internshipInputData, start_intern: date });
  };
  const handleEndDateChange = (date) => {
    setInternshipInputData({ ...internshipInputData, end_intern: date });
  };

  return (
    <>
      <label htmlFor="instance">Nama perusahaan</label>
      <input
        className="rounded-lg border border-gray-300"
        type="text"
        name="instance"
        id="instance"
        placeholder="Nama perusahaan"
        value={internshipInputData.instance}
        onChange={(e) => setInternshipInputData({ ...internshipInputData, [e.target.name]: e.target.value })}
        required
      />

      <label htmlFor="location">Lokasi perusahaan</label>
      <input
        className="rounded-lg border border-gray-300"
        type="text"
        name="location"
        id="location"
        placeholder="Lokasi"
        value={internshipInputData.location}
        onChange={(e) => setInternshipInputData({ ...internshipInputData, [e.target.name]: e.target.value })}
        required
      />

      <label htmlFor="type">Tipe magang</label>
      <select name="type" className="text-base block w-full border border-gray-300 rounded-lg" value={internshipInputData.type} onChange={(e) => setInternshipInputData({ ...internshipInputData, [e.target.name]: e.target.value })}>
        <option defaultValue="magang">Pilih tipe magang</option>
        <option value="perusahaan">Magang Perusahaan</option>
        <option value="kompetisi">Magang Kompetisi</option>
      </select>

      <label htmlFor="description">Deskripsi perusahaan</label>
      <input
        className="rounded-lg border border-gray-300"
        type="text"
        name="description"
        id="description"
        placeholder="Deskripsi"
        value={internshipInputData.description}
        onChange={(e) => setInternshipInputData({ ...internshipInputData, [e.target.name]: e.target.value })}
        required
      />

      <label htmlFor="phone">Kontak perusahaan</label>
      <input
        className="rounded-lg border border-gray-300"
        type="text"
        name="phone"
        id="phone"
        placeholder="Kontak"
        value={internshipInputData.phone}
        onChange={(e) => setInternshipInputData({ ...internshipInputData, [e.target.name]: e.target.value })}
        required
      />

      <label htmlFor="start_intern">Tanggal mulai</label>
      <Datepicker name="start_intern" id="start_intern" language="id-ID" labelTodayButton="Hari ini" showClearButton={false} onSelectedDateChanged={handleStartDateChange} required />

      <label htmlFor="end_intern">Tanggal akhir</label>
      <Datepicker name="end_intern" id="end_intern" language="id-ID" labelTodayButton="Hari ini" showClearButton={false} onSelectedDateChanged={handleEndDateChange} required />

      <label htmlFor="file_url">Surat bersedia dosen magang</label>
      <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer  focus:outline-none " id="file_url" type="file" ref={lectureFileInputRef} required />

      <label htmlFor="file_url">Surat magang dari kampus</label>
      <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer  focus:outline-none " id="file_url" type="file" ref={campusFileInputRef} required />

      <label htmlFor="file_url">Surat magang dari perusahaan</label>
      <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer  focus:outline-none " id="file_url" type="file" ref={internFileInputRef} required />
    </>
  );
};

export default FormUpdateInternship;
