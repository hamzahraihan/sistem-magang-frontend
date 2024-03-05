import PrimaryButton from '../../components/PrimaryButton';

const FormUploadReport = () => {
  return (
    <form className="flex flex-col gap-2 text-base">
      <label htmlFor="title">Judul</label>
      <input className="rounded-lg border border-gray-300" type="text" name="title" id="title" placeholder="Masukkan judul laporan akhir " />

      <label htmlFor="title">Keterangan laporan</label>
      <input className="rounded-lg border border-gray-300" type="text" name="title" id="title" placeholder="Masukkan judul laporan akhir " />

      <label htmlFor="file_url">Upload File</label>
      <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer  focus:outline-none " id="file_url" type="file" />
      <div className="lg:hidden block pt-4">
        <PrimaryButton text={'Kirim laporan'} />
      </div>
    </form>
  );
};

export default FormUploadReport;
