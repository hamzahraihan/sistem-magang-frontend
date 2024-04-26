import { formatDate } from '../../utils/formatDate';

const UserComment = () => {
  const dateDummy = new Date();

  return (
    <div>
      <div className="flex gap-2">
        <div className="h-10 w-10 bg-teal-500 animate-pulse rounded-full"></div>
        <div className="p-2 bg-white flex-1 rounded-lg w-fit">
          <p className="text-md font-bold">Hamzah</p>
          <p className="text-xs pb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae repudiandae atque quis debitis quaerat aspernatur distinctio, consequatur tenetur! Sint, aspernatur!</p>
          <p className="text-xs text-neutral-500">{formatDate(dateDummy)}</p>
        </div>
      </div>
    </div>
  );
};

export default UserComment;
