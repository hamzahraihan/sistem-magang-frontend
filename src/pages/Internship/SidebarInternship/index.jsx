import PrimaryButton from '../../../components/PrimaryButton';

const SidebarInternship = () => {
  return (
    <div className="lg:flex lg:col-span-1 col-span-3 flex-col top-5 lg:items-start">
      <div className="flex flex-col items-center w-full gap-5">
        <h1 className="text-xl font-bold text-start w-full">Daftar Magang</h1>
        <p className="text-neutral-500">
          Setelah anda mendapatkan persetujuan untuk magang, anda wajib mengisi form daftar magang untuk membukan fitur lengkap pada website seperti logbook, dan upload laporan. Hal ini wajib dilakukan oleh mahasiswa karena untuk
          persyaratan penilaian.
        </p>
        <div className="w-full">
          <PrimaryButton text="Daftar Magang" />
        </div>
      </div>
    </div>
  );
};

export default SidebarInternship;
