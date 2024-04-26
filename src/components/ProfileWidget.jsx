import { Link } from 'react-router-dom';
import Avvvatars from 'avvvatars-react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { pickRole } from '../utils/pickRole';
import { slugify } from '../utils/slugify';
import { getRoleId } from '../utils/getRoleId';

const ProfileWidget = ({ data }) => {
  return (
    <Link to={`/profile/${data?.role}/${_.kebabCase(slugify(data))}`} state={{ userId: getRoleId(data) }} className="flex items-center gap-2 w-fit lg:hidden">
      {!pickRole(data)?.image ? (
        <Avvvatars value={pickRole(data)?.first_name + pickRole(data)?.last_name} displayValue={_.capitalize(pickRole(data)?.first_name[0]) + _.capitalize(pickRole(data)?.last_name[0])} size={40} />
      ) : (
        <img src={`https://drive.google.com/thumbnail?id=${pickRole(data)?.image}&sz=w1000`} className="h-10 w-10 object-cover object-center" alt="profile" />
      )}
      <div className="flex flex-col">
        <p className="text-sm text-gray-600 ">{data?.author}</p>
        <p className="text-gray-400">{pickRole(data)?.email}</p>
      </div>
    </Link>
  );
};

ProfileWidget.propTypes = {
  data: PropTypes.object,
};

export default ProfileWidget;
