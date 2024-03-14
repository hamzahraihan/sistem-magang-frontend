import { Spinner } from '../../../components/Icons';
import { usePostContext } from '../../../hooks/usePostContext';
import SidebarCard from './SidebarCard';

const SidebarPost = () => {
  const { loadingPost, postById, post } = usePostContext();
  console.log('🚀 ~ SidebarPost ~ post:', post);

  return (
    <div className="lg:flex flex-col top-5 lg:items-start h-[90vh] hidden">
      <div className="flex flex-col items-center w-full gap-5">
        <h1 className="text-xl font-bold text-start w-full">Tentang Author</h1>
        <div className="h-28 w-28 bg-slate-500 animate-pulse rounded-full"></div>
        <div className="text-center">
          <p className="text-sm font-bold">
            {postById[0]?.Mahasiswa?.first_name} {postById[0]?.Mahasiswa?.last_name}
            {postById[0]?.Dosen?.first_name} {postById[0]?.Dosen?.last_name}
            {postById[0]?.Admin?.first_name} {postById[0]?.Admin?.last_name}
          </p>
          <p className="text-xs text-neutral-500 pb-2">
            {postById[0]?.Mahasiswa?.email}
            {postById[0]?.Dosen?.email}
            {postById[0]?.Admin?.email}
          </p>
        </div>
        <div className="flex flex-col gap-3 pb-10">
          <p className="text-lg font-bold">Post Lainnya</p>
          {loadingPost ? (
            <Spinner />
          ) : (
            post
              .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
              .slice(0, 2)
              .map((item) => <SidebarCard key={item.post_id} post={item} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarPost;
