import PrimaryButton from '../../../components/PrimaryButton';
import ReactQuill from 'react-quill';

const FormCreateInternship = () => {
  return (
    <>
      <label htmlFor="title">Judul</label>
      <input className="rounded-lg border border-gray-300" type="text" name="title" id="title" placeholder="Masukkan judul laporan akhir " />

      <label htmlFor="title">Keterangan laporan</label>
      <ReactQuill theme="snow" className="pb-10" />

      <label htmlFor="file_url">Surat bersedia dosen magang</label>
      <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer  focus:outline-none " id="file_url" type="file" />

      <label htmlFor="file_url">Surat magang dari kampus</label>
      <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer  focus:outline-none " id="file_url" type="file" />

      <label htmlFor="file_url">Surat magang dari perusahaan</label>
      <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer  focus:outline-none " id="file_url" type="file" />
      <div className="lg:hidden block pt-4">
        <PrimaryButton type="submit" text={'Kirim laporan'} />
      </div>
    </>
  );
};

export default FormCreateInternship;
