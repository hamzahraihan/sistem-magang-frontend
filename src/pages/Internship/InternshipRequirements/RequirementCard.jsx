import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const RequirementCard = ({ vector, title, link }) => {
  return (
    <Link to={link} className="group flex flex-col gap-2 border border-gray-300 p-3 rounded-xl h-full w-full hover:bg-primaryColor active:bg-activeColor  hover:border-white duration-150 bg-white relative">
      <img className="lg:group-hover:blur-sm duration-100 h-full" src={vector} alt="form-vector" />
      <div className="lg:absolute lg:block inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 duration-150 rounded-xl hidden">
        <div className="flex justify-center items-center h-full ">
          <p className="text-white font-bold text-sm text-center">{title}</p>
        </div>
      </div>
      <div className="lg:hidden text-center group-hover:text-white duration-100 font-bold z-30">{title}</div>
    </Link>
  );
};

RequirementCard.propTypes = {
  vector: PropTypes.string,
  title: PropTypes.string,
  link: PropTypes.string,
};

export default RequirementCard;
