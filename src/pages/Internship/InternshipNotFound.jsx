import SearchSVG from '../../assets/svg/Search-bro.svg';

const InternshipNotFound = () => {
  return (
    <>
      <p className="text-xl font-bold">Kegiatan Magang</p>
      <div className="h-80">
        <img className="mx-auto h-96 object-fill" height="500" width="500" src={SearchSVG} alt="intern-not-found" />
      </div>
      <div className="mx-auto text-center w-80">
        <p className="text-xl font-bold">Belum ada kegiatan</p>
        <p className="text-sm ">Silahkan daftar magang jika sudah dapat persetujuan dari perusahaan</p>
      </div>
    </>
  );
};

export default InternshipNotFound;
