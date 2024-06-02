import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../../components/Icons';
import Table from '../../../components/Table/Table';

import useFetchMahasiswa from '../../../features/user/useFetchMahasiswa';
import { createColumnHelper } from '@tanstack/react-table';

const AdminMahasiswa = () => {
  const { loading, mahasiswa } = useFetchMahasiswa();
  console.log('🚀 ~ AdminMahasiswa ~ mahasiswa:', mahasiswa);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('', {
      id: 'No.',
      cell: (info) => info.row.index + 1,
      header: () => <span className="ps-2">No.</span>,
      size: 50,
    }),
    columnHelper.accessor('first_name', {
      id: 'Nama depan',
      cell: (info) => info.getValue(),
      header: 'Nama Depan',
    }),
    columnHelper.accessor('last_name', {
      id: 'Nama Belakang',
      cell: (info) => info.getValue(),
      header: 'Nama Belakang',
    }),
    columnHelper.accessor('Dosen', {
      id: 'Dosen',
      cell: (info) => {
        return (
          <span>
            {info.getValue()?.first_name} {info.getValue()?.last_name}
          </span>
        );
      },
      header: 'Dosen Pembimbing',
    }),
    columnHelper.accessor('mahasiswa_id', {
      id: 'Aksi',
      cell: (info) => {
        return (
          <Link to={`/dashboard/admin/mahasiswa/${info.getValue()}`} className="flex p-2 bg-gray-200 rounded-lg m-auto text-center w-fit hover:bg-gray-300 active:bg-gray-400 duration-150">
            Lihat detail
          </Link>
        );
      },
      header: 'Aksi',
    }),
  ];

  return (
    <>
      <div className="flex flex-col lg:col-span-2 col-span-3">
        <Link to="/" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white mb-2">
          <ArrowIcon />
        </Link>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex flex-col mb-2">
            <h1 className="text-xl font-bold">Daftar Mahasiswa Yang Mengikuti Magang Mandiri</h1>
          </div>
          <Table columns={columns} data={mahasiswa} loading={loading} fileName={'daftar_mahasiswa_magang_mandiri'} />
        </div>
      </div>
    </>
  );
};

export default AdminMahasiswa;
