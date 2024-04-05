import { Link } from 'react-router-dom';
import InternshipPlaceholder from '../../components/Placeholder/InternshipPlaceholder';
import useFetchInternship from '../../features/internship/useFetchInternship';
import { ArrowIcon } from '../../components/Icons';
import { formatDate } from '../../utils/formatDate';
import _ from 'lodash';

const InternshipCard = () => {
  const { loading, internship } = useFetchInternship();
  return (
    <>
      {loading ? (
        <InternshipPlaceholder />
      ) : (
        internship.map((item) => (
          <Link
            to={`/kegiatan-magang/detail/${item.internship_id}`}
            state={{ internshipID: item.internship_id }}
            className="flex border items-center border-gray-200 rounded-xl p-4 hover:bg-primaryColor active:bg-activeColor hover:text-white hover:border-white transition-all"
            key={item.internship_id}
          >
            <div className="flex flex-1 flex-col">
              <p className="text-bold">Magang Mandiri</p>
              <p className="font-bold text-base">{_.capitalize(item.instance)}</p>
              <p>
                Periode Magang: {formatDate(item.start_intern)} - {formatDate(item.end_intern)}
              </p>
            </div>
            <div>
              <ArrowIcon />
            </div>
          </Link>
        ))
      )}
    </>
  );
};

export default InternshipCard;
