const SidebarLogbook = () => {
  return (
    <div className="lg:flex flex-col top-5 lg:items-start h-[90vh] hidden">
      <div className="flex flex-col items-center w-full gap-5">
        <h1 className="text-xl font-bold text-start w-full">Logbook</h1>
        <p className="text-neutral-500">
          Mahasiswa wajib mengisi Logbook/Laporan Kegiatan magang di bawah pengawasan dosen pembimbing selama kegiatan magang berlangsung. Hasil evaluasi dan catatan akhir dari dosen diperlukan untuk mendapatkan nilai magang mandiri
        </p>
      </div>
    </div>
  );
};

export default SidebarLogbook;
