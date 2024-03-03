import { ClockIcon, TagIcon } from '../../components/Icons';
import { formatDate } from '../../utils/formatDate';

const PostDate = () => {
  const dateDummy = new Date();

  return (
    <div className="flex gap-2">
      <p className="flex gap-1 items-center text-neutral-700 text-sm">
        <ClockIcon />
        {formatDate(dateDummy)}
      </p>
      <p className="flex gap-1 items-center text-neutral-700 text-sm">
        <TagIcon />
        Magang
      </p>
    </div>
  );
};

export default PostDate;
