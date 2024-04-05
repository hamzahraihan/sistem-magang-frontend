import { Link } from 'react-router-dom';
import { weekDay } from '../../utils/formatDate';
import _ from 'lodash';
import { ReportPlaceholderList } from './ReportPlaceholder';
import useFetchReportByMahasiswa from '../../features/report/useFetchReportByMahasiswa';

const ReportCard = () => {
  const { reportIntern, loading } = useFetchReportByMahasiswa();

  return (
    <>
      {loading ? (
        <ReportPlaceholderList />
      ) : (
        reportIntern.map((report) => (
          <Link
            to={`/report/detail/${report.report_id}`}
            key={report.report_id}
            className="group flex flex-col gap-2 border border-gray-300 p-3 rounded-xl w-full hover:bg-primaryColor active:bg-activeColor  hover:border-white duration-150 "
          >
            <p className="text-sm font-bold group-hover:text-white">{report?.title}</p>
            <div className="flex gap-2 items-center">
              <div>
                <p className="group-hover:text-white">{_.capitalize(report.Internship?.instance)}</p>
                <p className="text-gray-500 group-hover:text-white">{weekDay(report?.updatedAt)}</p>
              </div>
              <p className={`bg-gray-200 w-fit rounded-xl p-2 ms-auto flex-shrink-0 h-fit ${report?.status == 'belum diterima' ? 'text-gray-500' : 'text-green-500'}`}>{_.capitalize(report?.status)}</p>
            </div>
          </Link>
        ))
      )}
    </>
  );
};

export default ReportCard;
