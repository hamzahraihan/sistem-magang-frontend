import PrimaryButton from '../../../components/PrimaryButton';
import { useLogbookContext } from '../../../hooks/useLogbookContext';
import { weekDay } from '../../../utils/formatDate';

const LogbookWeek = () => {
  const { dailyLog } = useLogbookContext();

  return (
    <div className="flex flex-col gap-5">
      {dailyLog.slice(0, 5).map((item) => (
        <div key={item.logdaily_id} className="flex flex-col justify-center border border-neutral-300 rounded-[32px]">
          <div className="flex border-b items-center gap-2 border-neutral-200 rounded-tl-[32px] rounded-tr-[32px] p-4 font-bold">
            <div className={`h-10 w-10 rounded-full ${dailyLog.isComplete && 'bg-hoverColor'} border border-neutral-200`}></div>
            <div className="flex flex-col">
              <p>{weekDay(item.date_intern)}</p>
            </div>
          </div>
          <div className="flex m-auto p-4 w-fit">
            <PrimaryButton text={'Buat Laporan Harian'} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LogbookWeek;
