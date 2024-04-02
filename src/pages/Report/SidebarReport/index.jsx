import PrimaryButton from '../../../components/PrimaryButton';

const SidebarReport = () => {
  return (
    <div className="lg:col-span-1 gap-4 col-span-3 flex flex-col top-5 lg:items-start  ">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-xl">Segera kirim laporan akhir</h1>
        <div>
          <p>File laporan yang wajib harus kamu kirim</p>
          <ul className="list-disc list-inside">
            <li>File surat selesai magang</li>
            <li>File laporan akhir magang</li>
            <li>File penilaian dari perusahaan</li>
          </ul>
        </div>
        <p>Isi keterangan laporan dengan link google drive laporan kamu untuk dengan mudah kamu ubah jika kamu tidak yakin dengan laporan yang sudah kamu kirim</p>
      </div>
      <div className="lg:block w-full ">
        <PrimaryButton text="Buat laporan magang" />
      </div>
    </div>
  );
};

export default SidebarReport;
