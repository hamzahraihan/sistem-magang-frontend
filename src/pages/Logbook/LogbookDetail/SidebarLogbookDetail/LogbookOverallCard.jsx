import PrimaryButton from '../../../../components/PrimaryButton';
import useFetchDailyLogbook from '../../../../features/logbook/useFetchDailyLogbook';
import { weekDay } from '../../../../utils/formatDate';

const Placeholder = () => {
  return (
    <>
      <div className="flex items-center justify-center border border-neutral-300 rounded-full h-10 w-10 text-base">
        <p></p>
      </div>
      <div className="flex items-center justify-center border border-neutral-300 rounded-full h-10 w-10 text-base">
        <p></p>
      </div>
      <div className="flex items-center justify-center border border-neutral-300 rounded-full h-10 w-10 text-base">
        <p></p>
      </div>
      <div className="flex items-center justify-center border border-neutral-300 rounded-full h-10 w-10 text-base">
        <p></p>
      </div>
      <div className="flex items-center justify-center border border-neutral-300 rounded-full h-10 w-10 text-base">
        <p></p>
      </div>
    </>
  );
};

const LogbookOverallCard = () => {
  const { daily, loading } = useFetchDailyLogbook();
  const handleDisableButton = () => {
    const checkCompleteLog = daily.every((element) => element.isComplete);
    if (checkCompleteLog) {
      console.log('all data is complete');
      return false;
    } else {
      console.log('some data is not compelete');
      return true;
    }
  };
  handleDisableButton();

  return (
    <div className="flex flex-col gap-5 border border-neutral-300 rounded-[24px] p-4 w-full">
      <div className="flex justify-between">
        {loading ? (
          <Placeholder />
        ) : (
          daily.slice(0, 5).map((item) => (
            <div key={item.logday_id} className={`flex items-center justify-center border border-neutral-300 ${item.isComplete && 'bg-hoverColor text-white border-none'} rounded-full h-10 w-10 text-base`}>
              <p>{weekDay(item.date_intern)[0]}</p>
            </div>
          ))
        )}
      </div>
      <PrimaryButton text={'Laporan Mingguan'} disable={handleDisableButton()} />
      <div className="p-2 bg-gray-100 rounded-2xl">
        <p className="text-gray-400 text-center">Laporan mingguan baru bisa digunakan setelah laporan harian terisi semua</p>
      </div>
    </div>
  );
};

export default LogbookOverallCard;
