import PrimaryButton from '../../../../components/PrimaryButton';
import dayName from '../../../../utils/dayName';

const LogbookOverallCard = (props) => {
  const { weekLog } = props;
  console.log('🚀 ~ LogbookOverallCard ~ state:', weekLog);
  return (
    <div className="flex flex-col gap-5 border border-neutral-300 rounded-[24px] p-4 w-full">
      <div className="flex justify-between">
        {weekLog.slice(0, 5).map((item, index) => (
          <div key={index} className="flex items-center justify-center border border-neutral-300 rounded-full h-10 w-10 text-base">
            <p>{dayName[item?.getDay()][0]}</p>
          </div>
        ))}
      </div>
      <PrimaryButton text={'Laporan Mingguan'} />
    </div>
  );
};

export default LogbookOverallCard;
