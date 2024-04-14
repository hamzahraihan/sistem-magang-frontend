import _ from 'lodash';

export const slugify = (data) => {
  const full_name = data?.author;
  const slug_name = _.kebabCase(full_name);
  return slug_name;
};
