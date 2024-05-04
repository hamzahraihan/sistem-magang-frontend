import { createColumnHelper } from '@tanstack/react-table';
import Table from '../../../../../components/Table/Table';
import useFetchWeeklyLogbook from '../../../../../features/logbook/useFetchWeeklyLogbook';
import { Link } from 'react-router-dom';

const WeeklyReport = () => {
  const { loading, logbookWeekly } = useFetchWeeklyLogbook();
  console.log('🚀 ~ WeeklyReport ~ logbookWeekly:', logbookWeekly);
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('', {
      id: 'Minggu',
      cell: (info) => info.row.index + 1,
      header: 'Minggu',
      size: 10,
    }),
    columnHelper.accessor('log_description', {
      id: 'Catatan Laporan mingguan',
      cell: (info) => {
        const value = info.getValue();
        if (value) {
          return <span className="line-clamp-1">{info.getValue()}</span>;
        }
        return <span className="font-bold text-red-500">Belum membuat laporan</span>;
      },
      header: 'Catatan laporan mingguan',
      size: 200,
    }),
    columnHelper.accessor('Logdailies', {
      id: 'Laporan Harian',
      cell: (info) => {
        const value = info.getValue();
        const filterData = value.filter((entry) => entry.log_description !== null && entry.log_description !== undefined && entry.log_description !== '');
        const progressValue = filterData.length;
        return (
          <div className="text-center font-bold">
            {progressValue} / {value.length - 2}
          </div>
        );
      },
      header: <span className="w-full text-center">Laporan Harian</span>,
      size: 100,
    }),
    columnHelper.accessor('status', {
      id: 'Status',
      cell: (info) => {
        const value = info.getValue();
        if (value == 'Belum disetujui') {
          return <span className="flex rounded-lg m-auto text-center w-fit bg-red-500 p-2 text-white">{value}</span>;
        }
        return <span className="flex rounded-lg m-auto text-center w-fit bg-green-400 text-white p-2">{value}</span>;
      },

      header: <span className="w-full text-center">Status</span>,
    }),
    columnHelper.accessor('internship_id', {
      id: 'Logbook',
      cell: (info) => (
        <Link to={`/dashboard/dosen/mahasiswa/internship-report/${info.getValue()}`} className="flex p-2 bg-gray-300 rounded-lg m-auto text-center w-fit hover:bg-gray-200 active:bg-gray-400 duration-150">
          Lihat detail
        </Link>
      ),
      size: 50,
      header: <span className="w-full text-center">Logbook</span>,
    }),
  ];
  return (
    <div className="bg-white rounded-xl w-full col-span-3 border border-neutral-200 p-5 mb-10">
      <h1 className="text-xl font-bold mb-10">Laporan Mingguan Mahasiswa</h1>
      <Table columns={columns} data={logbookWeekly} loading={loading} fileName={`laporan_mingguan_mahasiswa}`} />
    </div>
  );
};

export default WeeklyReport;
