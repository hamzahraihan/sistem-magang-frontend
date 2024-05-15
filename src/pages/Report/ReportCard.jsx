import { Link } from 'react-router-dom';
import { weekDay } from '../../utils/formatDate';
import _ from 'lodash';
import { ReportPlaceholderList } from './ReportPlaceholder';
import useFetchReportByMahasiswa from '../../features/report/useFetchReportByMahasiswa';

const ReportCard = () => {
  const { reportIntern, loading } = useFetchReportByMahasiswa();

  const handleStatus = (status) => {
    switch (status) {
      case 'Belum disetujui':
        return <p className="w-fit rounded-xl p-2 ms-auto flex-shrink-0 h-fit bg-gray-300 text-black">Belum disetujui</p>;
      case 'Valid':
        return <p className="w-fit rounded-xl p-2 ms-auto flex-shrink-0 h-fit bg-green-500 text-white">Valid</p>;
      case 'Perlu direvisi':
        return <p className="w-fit rounded-xl p-2 ms-auto flex-shrink-0 h-fit bg-red-500 text-white">Perlu direvisi</p>;
    }
  };

  return (
    <>
      {loading ? (
        <ReportPlaceholderList />
      ) : (
        reportIntern.map((report) => (
          <Link
            to={`/report/detail/${report.report_id}`}
            key={report.report_id}
            className="group flex flex-col gap-2 border border-gray-300 p-3 rounded-xl w-full hover:bg-primaryColor active:bg-activeColor  hover:border-white duration-150 bg-white"
          >
            <p className="text-sm font-bold group-hover:text-white">{report?.title}</p>
            <div className="flex gap-2 items-center">
              <div>
                <p className="group-hover:text-white">{_.capitalize(report.Internship?.instance)}</p>
                <p className="text-gray-500 group-hover:text-white">{weekDay(report?.updatedAt)}</p>
              </div>
              {handleStatus(report.status)}
            </div>
          </Link>
        ))
      )}
    </>
  );
};

export default ReportCard;
