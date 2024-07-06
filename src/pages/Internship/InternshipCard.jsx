import { Link } from 'react-router-dom';
import InternshipPlaceholder from '../../components/Placeholder/InternshipPlaceholder';
import useFetchInternship from '../../features/internship/useFetchInternship';
import { formatDate } from '../../utils/formatDate';
import _ from 'lodash';

const InternshipCard = () => {
  const { loading, internship } = useFetchInternship();
  console.log('🚀 ~ InternshipCard ~ internship:', internship);

  return (
    <>
      {loading ? (
        <InternshipPlaceholder />
      ) : (
        internship.map((item) => (
          <Link
            to={`/kegiatan-magang/detail/${item.internship_id}`}
            state={{ internshipID: item.internship_id }}
            className="flex border items-center border-gray-200 rounded-xl p-4 hover:bg-primaryColor active:bg-activeColor hover:text-white hover:border-white transition-all bg-white"
            key={item.internship_id}
          >
            <div className="flex justify-evenly w-full">
              <div className="flex-1">
                <p className="text-bold">Magang Mandiri</p>
                <p className="font-bold text-base">{_.capitalize(item.instance)}</p>
                <div className="flex flex-row justify-between">
                  <p>
                    Periode Magang: {formatDate(item.start_intern)} - {formatDate(item.end_intern)}
                  </p>
                </div>
              </div>
              <div className={`mt-auto p-2 h-fit rounded-md text-black ${item.status == 'Belum diterima' ? 'bg-gray-300' : 'bg-green-400 text-white'}`}>{item.status}</div>
            </div>
          </Link>
        ))
      )}
    </>
  );
};

export default InternshipCard;
