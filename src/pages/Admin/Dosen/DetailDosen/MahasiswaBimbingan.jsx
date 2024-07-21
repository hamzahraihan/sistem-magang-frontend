import _ from 'lodash';
import Table from '../../../../components/Table/Table';
import useFetchUserByID from '../../../../features/user/useFetchUserById';
import { createColumnHelper } from '@tanstack/react-table';
import useFetchMahasiswaByDosen from '../../../../features/user/useFetchMahasiswaByDosen';
import { Link } from 'react-router-dom';

const MahasiswaBimbingan = () => {
  const { loading, userByID } = useFetchUserByID();
  const { mahasiswaDosen } = useFetchMahasiswaByDosen();

  const fullName = {
    value: loading ? <p className="bg-gray-500 h-5 animate-pulse rounded-md w-full"></p> : _.upperCase(` ${userByID.first_name} ${userByID.last_name}`),
  };
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('', {
      id: 'No.',
      cell: (info) => info.row.index + 1,
      header: () => <span className="ps-2">No.</span>,
      size: 20,
    }),
    columnHelper.accessor('first_name', {
      id: 'Nama Depan',
      cell: (info) => info.getValue(),
      header: 'Nama depan',
    }),
    columnHelper.accessor('last_name', {
      id: 'Nama Belakang',
      cell: (info) => info.getValue(),
      header: 'Nama Belakang',
    }),
    columnHelper.accessor('nim', {
      id: 'NIM',
      cell: (info) => info.getValue(),
      header: 'NIM',
    }),
    columnHelper.accessor('angkatan', {
      id: 'Angkatan',
      cell: (info) => <div className="rounded-lg p-2 text-center w-fit m-auto ">{info.getValue()}</div>,
      header: <span className="w-full text-center">Angkatan</span>,
    }),
    columnHelper.accessor('mahasiswa_id', {
      id: 'Aksi',
      cell: (info) => (
        <Link to={`/dashboard/admin/mahasiswa/${info.getValue()}`} className="flex p-2 bg-gray-200 rounded-lg m-auto text-center w-fit hover:bg-gray-300 active:bg-gray-400 duration-150">
          Lihat detail
        </Link>
      ),
      header: <span className="w-full text-center">Aksi</span>,
    }),
  ];

  return (
    <div className="bg-white rounded-xl col-span-3 border border-neutral-200 p-5">
      <h1 className="text-xl font-bold">Mahasiswa Bimbingan</h1>
      <Table columns={columns} data={mahasiswaDosen} loading={loading} fileName={`daftar_mahasiswa_bimbingan_dosen_${fullName}`} />
    </div>
  );
};

export default MahasiswaBimbingan;
