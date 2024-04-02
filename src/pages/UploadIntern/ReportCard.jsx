import { Link } from 'react-router-dom';
import useFetchReportByInternship from '../../features/report/useFetchReportByInternship';
import { weekDay } from '../../utils/formatDate';
import _ from 'lodash';

const ReportCard = () => {
  const { reportIntern } = useFetchReportByInternship();
  console.log('🚀 ~ ReportCard ~ reportIntern:', reportIntern);
  return (
    <Link to="/" className="group flex flex-col gap-2 border border-gray-300 p-3 rounded-xl w-full hover:bg-hoverColor  hover:border-white duration-150 ">
      <p className="text-sm font-bold group-hover:text-white">{reportIntern?.title}</p>
      <div className="flex gap-2 items-center">
        <div>
          <p className="group-hover:text-white">{_.capitalize(reportIntern.Internship?.instance)}</p>
          <p className="text-gray-500 group-hover:text-white">{weekDay(reportIntern?.updatedAt)}</p>
        </div>
        <p className={`bg-gray-200 w-fit rounded-xl p-2 ms-auto flex-shrink-0 h-fit ${reportIntern?.status == 'belum diterima' ? 'text-gray-500' : 'text-green-500'}`}>{_.capitalize(reportIntern?.status)}</p>
      </div>
    </Link>
  );
};

export default ReportCard;
