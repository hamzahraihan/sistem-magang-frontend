import { createColumnHelper } from '@tanstack/react-table';
import Table from '../../../../components/Table/Table';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../../utils/formatDate';
import useFetchInternship from '../../../../features/internship/useFetchInternship';

const LogbookMahasiswa = () => {
  const { loading, internship } = useFetchInternship();
  console.log('🚀 ~ LogbookMahasiswa ~ internship:', internship);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('', {
      id: 'No',
      cell: (info) => info.row.index + 1,
      header: 'No.',
      size: 20,
    }),
    columnHelper.accessor('instance', {
      id: 'Perusahaan/Instansi',
      cell: (info) => info.getValue(),
      header: 'Perusahaan/Instansi',
      size: 400,
    }),
    columnHelper.accessor('location', {
      id: 'Lokasi',
      cell: (info) => info.getValue(),
      header: 'Lokasi',
    }),
    columnHelper.accessor('phone', {
      id: 'Kontak',
      cell: (info) => info.getValue(),
      header: 'Kontak',
    }),
    columnHelper.accessor('createdAt', {
      id: 'Tanggal',
      cell: (info) => <span>{formatDate(info.getValue())}</span>,
      header: 'Tanggal',
    }),
    columnHelper.accessor('internship_id', {
      id: 'Aksi',
      cell: (info) => (
        <Link to={`/dashboard/dosen/mahasiswa/internship-report/${info.getValue()}`} className="flex p-2 bg-gray-200 rounded-lg m-auto text-center w-fit hover:bg-gray-300 active:bg-gray-400 duration-150">
          Lihat detail
        </Link>
      ),
      header: <span className=" w-full text-center">Aksi</span>,
    }),
  ];

  return (
    <div className="bg-white rounded-xl w-full col-span-3 border border-neutral-200 p-5 mb-10 overflow-auto">
      <h1 className="text-xl font-bold">Magang Mahasiswa</h1>
      <Table columns={columns} data={internship} loading={loading} fileName={`laporan_mahasiswa_${internship[0]?.Mahasiswa?.first_name}_${internship[0]?.Mahasiswa?.last_name}`} />
    </div>
  );
};

export default LogbookMahasiswa;
