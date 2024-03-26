import { Link } from 'react-router-dom';
import InternshipSVG from '../../../../assets/svg/Freelancer-bro.svg';
import { formatDate } from '../../../../utils/formatDate';
import { Spinner } from '../../../../components/Icons';
import _ from 'lodash';
import useFetchInternship from '../../../../features/internship/useFetchInternship';

const InternshipSideCard = () => {
  const { loading, internship } = useFetchInternship();

  const imageBackground = {
    backgroundImage: `url(${InternshipSVG})`,
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        internship.map((item) => (
          <Link
            to={`/kegiatan-magang/detail/${item.internship_id}`}
            state={{ internshipID: item.internship_id }}
            key={item.internship_id}
            className="flex flex-col gap-2 border border-neutral-200 rounded-[32px] h-full w-full"
            onClick={window.scrollTo(0, 0)}
          >
            <div className="h-28 bg-no-repeat bg-cover bg-center rounded-se-[32px] rounded-ss-[32px]" style={imageBackground}></div>
            <div className="flex flex-col gap-1 p-4 ">
              <div className="flex gap-2">
                <p className="flex gap-1 items-center text-neutral-700 text-xs">Magang Mandiri</p>
              </div>
              <p className="text-sm font-bold">{_.capitalize(item.instance)}</p>
              <p className="text-neutral-400">
                {formatDate(item.start_intern)} - {formatDate(item.end_intern)}
              </p>
            </div>
          </Link>
        ))
      )}
    </>
  );
};

export default InternshipSideCard;
