import _ from 'lodash';
import { pickRole } from './pickRole';

export const slugify = (data) => {
  const full_name = `${pickRole(data)?.first_name} ${pickRole(data)?.last_name}`;
  const slug_name = _.kebabCase(full_name);
  return slug_name;
};
