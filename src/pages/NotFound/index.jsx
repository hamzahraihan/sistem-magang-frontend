import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col gap-3 justify-center items-center h-screen p-2 text-center">
      <h1 className="text-9xl font-bold">Oops!</h1>
      <p className="text-base">Halaman yang kamu cari tidak ditemukan atau kamu belum login.</p>
      <Link to="/" className="bg-primaryColor rounded-[32px] py-2 px-4 shadow-md hover:bg-hoverColor text-white transition-all active:bg-activeColor">
        Kembali ke beranda
      </Link>
    </div>
  );
};

export default NotFound;
