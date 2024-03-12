import PrimaryButton from '../../../../components/PrimaryButton';

const SidebarCreatePost = () => {
  return (
    <div className="flex flex-col top-5 lg:items-start lg:order-first order-last">
      <div className="w-full font-bold">
        <PrimaryButton type={'submit'} text={'Submit'} />
      </div>
    </div>
  );
};

export default SidebarCreatePost;
