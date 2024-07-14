import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../../components/Icons';
import { useUserContext } from '../../../hooks/useUserContext';
import Table from '../../../components/Table/Table';
import { createColumnHelper } from '@tanstack/react-table';
import useFetchMahasiswaByDosen from '../../../features/user/useFetchMahasiswaByDosen';
import { weekDay } from '../../../utils/formatDate';

// Logbook view for dosen role
const DosenMahasiswa = () => {
  const { userLoggedInData } = useUserContext();
  const { loading, mahasiswaDosen } = useFetchMahasiswaByDosen();

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
        return <div className={`p-2 rounded-md w-full text-center ${statusColor}`}>{statusText}</div>;
      },
      header: <span className="w-full text-center">Status</span>,
    }),
    columnHelper.accessor('createdAt', {
      id: 'Tanggal',
      cell: (info) => <span>{weekDay(info.getValue())}</span>,
      header: <span className="w-full text-center">Tanggal</span>,
    }),
    columnHelper.accessor('mahasiswa_id', {
      id: 'Aksi',
      cell: (info) => (
        <Link to={`logbook-mahasiswa/${info.getValue()}`} className="flex p-2 bg-gray-200 rounded-lg m-auto text-center w-fit hover:bg-gray-300 active:bg-gray-400 duration-150">
          Lihat detail
        </Link>
      ),
      header: <span className="w-full text-center">Aksi</span>,
    }),
  ];

  const filteredData = mahasiswaDosen.map((item) => {
    const { mahasiswa_id, first_name, last_name, email, role, nim, jurusan, angkatan, status, kelas, phone, createdAt } = item;
    return { mahasiswa_id, first_name, last_name, email, role, nim, jurusan, angkatan, status, kelas, phone, createdAt };
  });

  return (
    <div className="col-span-3 pb-10 min-w-full">
      <div className="flex flex-col lg:col-span-2 col-span-3">
        <Link to="/" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white mb-2">
          <ArrowIcon />
        </Link>
        <div className="bg-white rounded-xl border border-gray-200 p-5 overflow-auto">
          <div className="flex flex-col mb-2">
            <h1 className="text-xl font-bold">Daftar Mahasiswa</h1>
            <p className="text-sm">
              Dosen wali: {userLoggedInData?.first_name} {userLoggedInData?.last_name}
            </p>
          </div>
          <Table columns={columns} data={filteredData} loading={loading} fileName={'laporan_mahasiswa_magang_mandiri'} />
        </div>
      </div>
    </div>
  );
};

export default DosenMahasiswa;
