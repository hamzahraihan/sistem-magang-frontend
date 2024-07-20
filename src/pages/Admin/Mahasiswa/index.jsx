import { Link } from 'react-router-dom';
import { ArrowIcon, CheckIcon, LogbookIcon, UserIcon } from '../../../components/Icons';
import Table from '../../../components/Table/Table';
import useFetchMahasiswa from '../../../features/user/useFetchMahasiswa';
import { createColumnHelper } from '@tanstack/react-table';
import { useState } from 'react';
import FormImportMahasiswa from './ImportMahasiswa/FormImportMahasiswa';
import { weekDay } from '../../../utils/formatDate';

const AdminMahasiswa = () => {
  const { loading, mahasiswa } = useFetchMahasiswa();
  const [openModal, setOpenModal] = useState(false);

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
    columnHelper.accessor('status', {
      id: 'Status',
      cell: (info) => {
        let statusColor;
        let statusText;
        switch (info.getValue()) {
          case 'Belum magang':
            statusColor = ' bg-gray-300 text-black';
            statusText = 'Belum magang';
            break;
          case 'Selesai magang':
            statusColor = 'bg-green-500 text-white';
            statusText = 'Selesai magang';
            break;
          case 'Sedang magang':
            statusColor = 'bg-yellow-300 text-black';
            statusText = 'Sedang magang';
            break;
          case 'Permintaan magang':
            statusColor = 'bg-amber-200 text-black';
            statusText = 'Permintaan magang';
            break;
          default:
            break;
        }
        return <div className={`p-2 rounded-md w-fit ${statusColor}`}>{statusText}</div>;
      },
      header: 'Status',
    }),
    columnHelper.accessor('angkatan', {
      id: 'Angkatan',
      cell: (info) => info.getValue(),
      header: 'Angkatan',
    }),
    columnHelper.accessor('createdAt', {
      id: 'Tanggal',
      cell: (info) => <span>{weekDay(info.getValue())}</span>,
      header: 'Tanggal',
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
      header: <span className="w-full text-center">Aksi</span>,
    }),
  ];

  return (
    <>
      <div className="flex flex-col lg:col-span-2 col-span-3 ">
        <Link to="/" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white mb-2">
          <ArrowIcon />
        </Link>
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-2">
          <div className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-xl mb-3">
            <div className="p-3 bg-primaryColor text-white rounded-full">
              <UserIcon />
            </div>
            <div className="flex flex-col text-sm">
              <p className="text-gray-400">Total Mahasiswa</p>
              <p className="font-bold">{mahasiswa.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-xl mb-3">
            <div className="p-3 bg-green-600 text-white rounded-full">
              <CheckIcon />
            </div>
            <div className="flex flex-col text-sm">
              <p className="text-gray-400">Mahasiswa Selesai Magang</p>
              <p className="font-bold">{mahasiswa.filter((item) => item.status == 'Selesai magang').length}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-xl mb-3">
            <div className="p-3 bg-yellow-300 text-white rounded-full">
              <LogbookIcon />
            </div>
            <div className="flex flex-col text-sm">
              <p className="text-gray-400">Mahasiswa Sedang Magang</p>
              <p className="font-bold">{mahasiswa.filter((item) => item.status == 'Sedang magang').length}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-xl mb-3">
            <div className="flex flex-shrink-0 justify-center items-center p-3 bg-gray-400 text-white rounded-full text-xl font-bold w-12 h-12">?</div>
            <div className="flex flex-col text-sm">
              <p className="text-gray-400">Mahasiswa Belum Magang</p>
              <p className="font-bold">{mahasiswa.filter((item) => item.status == 'Belum magang').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 overflow-auto w-full">
          <div className="flex justify-between mb-2">
            <h1 className="text-xl font-bold">Daftar Mahasiswa</h1>
            <button type="file" className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 active:bg-gray-400 duration-150" onClick={() => setOpenModal(true)}>
              Import data from excel
            </button>
          </div>
          {openModal && <FormImportMahasiswa isOpen={openModal} closeModal={() => setOpenModal(false)} />}
          <Table columns={columns} data={mahasiswa} loading={loading} fileName={'daftar_mahasiswa_magang_mandiri'} />
        </div>
      </div>
    </>
  );
};

export default AdminMahasiswa;
