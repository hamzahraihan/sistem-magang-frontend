import { ClockIcon, TagIcon } from '../../components/Icons';

const CardPost = () => {
  return (
    <div className="border border-neutral-200 rounded-[32px]">
      <div className="bg-slate-300 animate-pulse h-48 rounded-se-[32px] rounded-ss-[32px] cursor-pointer"></div>
      <div className="flex flex-col gap-3 p-7">
        <div className="flex gap-2">
          <p className="flex gap-1 items-center text-neutral-400 text-sm">
            <ClockIcon />
            19 November 2023
          </p>
          <p className="flex gap-1 items-center text-neutral-400 text-sm">
            <TagIcon />
            Magang
          </p>
        </div>
        <p className="font-bold">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore atque</p>
        <p className="text-base line-clamp-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda aliquid itaque obcaecati accusamus numquam. Perferendis recusandae voluptas quidem, optio omnis repudiandae et, hic sint perspiciatis aliquam repellendus! Nam
          quisquam esse eveniet nesciunt explicabo aliquid voluptates sunt dicta alias ea? Possimus quam corporis aperiam necessitatibus suscipit commodi ipsum nemo delectus modi.
        </p>
        <p className="text-neutral-400 underline">Hamzah</p>
      </div>
    </div>
  );
};

export default CardPost;
