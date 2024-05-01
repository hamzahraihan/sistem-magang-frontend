import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../../components/Icons';
import { useUserContext } from '../../../hooks/useUserContext';
import Table from '../../../components/Table/Table';
import { createColumnHelper } from '@tanstack/react-table';
import useFetchMahasiswaByDosen from '../../../features/user/useFetchMahasiswaByDosen';

// Logbook view for dosen role
const Mahasiswa = () => {
  const { userLoggedInData } = useUserContext();
  const { loading, mahasiswaDosen } = useFetchMahasiswaByDosen();

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('', {
      id: 'S.No',
      cell: (info) => info.row.index + 1,
      header: () => <span className="ps-2">No.</span>,
    }),
    columnHelper.accessor('first_name', {
      cell: (info) => info.getValue(),
      header: 'Nama depan',
    }),
    columnHelper.accessor('last_name', {
      cell: (info) => info.getValue(),
      header: 'Nama Belakang',
    }),
    columnHelper.accessor('nim', {
      cell: (info) => info.getValue(),
      header: 'NIM',
    }),
    columnHelper.accessor('angkatan', {
      cell: (info) => <div className="rounded-lg p-2 text-center w-fit m-auto ">{info.getValue()}</div>,
      header: <span className="w-full text-center">Angkatan</span>,
    }),
    columnHelper.accessor('mahasiswa_id', {
      cell: (info) => (
        <Link to={`logbook-mahasiswa/${info.getValue()}`} className="flex p-2 bg-gray-300 rounded-lg m-auto text-center w-fit hover:bg-gray-200 active:bg-gray-400 duration-150">
          Lihat detail
        </Link>
      ),
      header: <span className="w-full text-center">Logbook</span>,
    }),
  ];

  const filteredData = mahasiswaDosen.map((item) => {
    const { first_name, last_name, email, role, nim, jurusan, angkatan, status, kelas, phone } = item;
    return { first_name, last_name, email, role, nim, jurusan, angkatan, status, kelas, phone };
  });

  return (
    <div className="col-span-3 pb-10">
      <div className="flex flex-col lg:col-span-2 col-span-3">
        <Link to="/" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white mb-2">
          <ArrowIcon />
        </Link>
        <div className="flex flex-col mb-2">
          <h1 className="text-xl font-bold">Daftar Mahasiswa</h1>
          <p className="text-sm">
            Dosen wali: {userLoggedInData?.first_name} {userLoggedInData?.last_name}
          </p>
        </div>
        <Table columns={columns} data={filteredData} loading={loading} fileName={'laporan_mahasiswa_magang_mandiri'} />
      </div>
    </div>
  );
};

export default Mahasiswa;
