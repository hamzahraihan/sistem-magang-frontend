import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../../../components/Icons';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '../../../../components/Table/Table';
import useFetchReport from '../../../../features/report/useFetchReport';
import { weekDay } from '../../../../utils/formatDate';

const ReportInternship = () => {
  const { loading, reportIntern } = useFetchReport();
  console.log('🚀 ~ ReportInternship ~ reportIntern:', reportIntern);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('', {
      id: 'No.',
      cell: (info) => info.row.index + 1,
      header: () => <span className="ps-2">No.</span>,
      size: 20,
    }),
    columnHelper.accessor('Mahasiswa', {
      id: 'Nama Depan',
      cell: (info) => {
        return (
          <span>
            {info.getValue().first_name} {info.getValue().last_name}
          </span>
        );
      },
      header: 'Nama depan',
    }),
    columnHelper.accessor('Mahasiswa', {
      id: 'NIM',
      cell: (info) => info.getValue().nim,
      header: 'NIM',
    }),
    columnHelper.accessor('title', {
      id: 'Judul Laporan',
      cell: (info) => info.getValue(),
      header: 'Judul Laporan',
      size: 200,
    }),
    columnHelper.accessor('updatedAt', {
      id: 'Tanggal',
      cell: (info) => weekDay(info.getValue()),
      header: 'Tanggal',
    }),
    columnHelper.accessor('report_id', {
      id: 'Aksi',
      cell: (info) => (
        <Link to={`/dashboard/mahasiswa/laporan-akhir/${info.getValue()}`} className="flex p-2 bg-gray-200 rounded-lg m-auto text-center w-fit hover:bg-gray-300 active:bg-gray-400 duration-150">
          Lihat detail
        </Link>
      ),
      header: <span className="w-full text-center">Aksi</span>,
    }),
  ];
  return (
    <div className="col-span-3 pb-10">
      <div className="flex flex-col lg:col-span-2 col-span-3">
        <Link to="/" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white mb-2">
          <ArrowIcon />
        </Link>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex flex-col mb-2">
            <h1 className="text-xl font-bold">Laporan Akhir Magang</h1>
            <p className="text-sm">{/* Dosen wali: {userLoggedInData?.first_name} {userLoggedInData?.last_name} */}</p>
          </div>
          <Table columns={columns} data={reportIntern} loading={loading} fileName={'laporan_akhir_mahasiswa_magang_mandiri'} />
        </div>
      </div>
    </div>
  );
};

export default ReportInternship;
