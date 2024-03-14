import { usePostContext } from '../../hooks/usePostContext';
import PostDate from './PostDate';

const Description = () => {
  const { postById } = usePostContext();
  return (
    <div className="flex flex-col gap-2 ">
      <PostDate />
      <div className="flex flex-col gap-2 pb-2">
        <h1 className="text-xl font-bold leading-8">{postById[0]?.title}</h1>
        <p className="text-base" dangerouslySetInnerHTML={{ __html: postById[0]?.description }} />
      </div>
      <div className="border-t border-slate-300 w-full"></div>
    </div>
  );
};

export default Description;
