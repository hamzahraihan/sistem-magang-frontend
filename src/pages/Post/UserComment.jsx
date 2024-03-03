import { formatDate } from '../../utils/formatDate';

const UserComment = () => {
  const dateDummy = new Date();

  return (
    <div className="border border-neutral-300 rounded-[32px] p-5 ">
      <div className="flex gap-2">
        <div className="h-[50px] w-[50px] bg-teal-500 animate-pulse rounded-full"></div>
        <div className="flex-1 w-fit">
          <p className="text-base font-bold">Hamzah</p>
          <p className="text-base pb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae repudiandae atque quis debitis quaerat aspernatur distinctio, consequatur tenetur! Sint, aspernatur!</p>
          <p className="text-md text-neutral-500">{formatDate(dateDummy)}</p>
        </div>
      </div>
    </div>
  );
};

export default UserComment;
