import PrimaryButton from '../../../components/PrimaryButton';

const SidebarReport = () => {
  return (
    <div className="lg:col-span-1 gap-4 col-span-3 flex flex-col top-5 lg:items-start  ">
      <div className="lg:block w-full hidden">
        <PrimaryButton text={'Kirim Laporan'} />
      </div>
      <div className="border-t border-neutral-300 w-full lg:block hidden"></div>
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-xl">Baca sebelum mengirim laporan</h1>
        <p>Jangan lupa mengecek lagi file laporan kamu sebelum dikirim.</p>
        <div>
          <p>File laporan yang wajib harus kamu kirim</p>
          <ul className="list-disc list-inside">
            <li>File surat bersedia dosen magang</li>
            <li>File surat magang dari kampus</li>
            <li>File surat selesai magang</li>
            <li>File laporan akhir magang</li>
            <li>File penilaian dari perusahaan</li>
          </ul>
        </div>
        <p>Isi keterangan laporan dengan link google drive laporan kamu untuk dengan mudah kamu ubah jika kamu tidak yakin dengan laporan yang sudah kamu kirim</p>
      </div>
    </div>
  );
};

export default SidebarReport;
