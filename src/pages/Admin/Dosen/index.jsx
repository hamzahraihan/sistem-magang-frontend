import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../../components/Icons';
import Table from '../../../components/Table/Table';
import useFetchDosen from '../../../features/user/useFetchDosen';
import { createColumnHelper } from '@tanstack/react-table';

const AdminDashboardDosen = () => {
  const { loading, dosen } = useFetchDosen();
  console.log('🚀 ~ AdminDashboardDosen ~ dosen:', dosen);

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
      header: () => <span>Nama depan</span>,
    }),
    columnHelper.accessor('last_name', {
      id: 'Nama belakang',
      cell: (info) => info.getValue(),
      header: () => <span>Nama Belakang</span>,
    }),
    columnHelper.accessor('nidn', {
      id: 'NIDN',
      cell: (info) => info.getValue(),
      header: () => <span>NIDN</span>,
    }),
    columnHelper.accessor('dosen_id', {
      id: 'Aksi',
      cell: (info) => {
        return (
          <Link to={`/dashboard/admin/mahasiswa/${info.getValue()}`} className="flex p-2 bg-gray-200 rounded-lg m-auto text-center w-fit hover:bg-gray-300 active:bg-gray-400 duration-150">
            Lihat detail
          </Link>
        );
      },
      header: () => <span className="w-full text-center">Aksi</span>,
    }),
  ];

  return (
    <div className="flex flex-col lg:col-span-2 col-span-3">
      <div className="flex justify-between">
        <Link to="/" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white mb-2">
          <ArrowIcon />
        </Link>
        <Link to="create" className="h-fit w-fit border border-gray-300 rounded-xl font-bold p-3 bg-white hover:bg-gray-50">
          Buat akun
        </Link>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex flex-col mb-2">
          <h1 className="text-xl font-bold">Daftar Dosen Pembimbing</h1>
        </div>
        <Table columns={columns} data={dosen} loading={loading} fileName={'daftar_dosen_pembimbing'} />
      </div>
    </div>
  );
};

export default AdminDashboardDosen;
