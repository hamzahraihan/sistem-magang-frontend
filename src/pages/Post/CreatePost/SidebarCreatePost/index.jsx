import PrimaryButton from '../../../../components/PrimaryButton';
import { usePostContext } from '../../../../hooks/usePostContext';

const SidebarCreatePost = () => {
  const { loadingPost } = usePostContext();
  return (
    <div className="flex flex-col top-5 lg:items-start lg:order-first order-last">
      <div className="w-full font-bold">
        <PrimaryButton type="submit" text="Submit" loading={loadingPost} />
      </div>
    </div>
  );
};

export default SidebarCreatePost;
