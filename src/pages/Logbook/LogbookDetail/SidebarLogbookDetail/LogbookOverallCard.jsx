import { useState } from 'react';

import ModalWeeklyForm from './ModalWeeklyForm';
import { useParams } from 'react-router-dom';
import useFetchDailyLogbook from '../../../../features/logbook/useFetchDailyLogbook';
import { weekDay } from '../../../../utils/formatDate';
import PrimaryButton from '../../../../components/PrimaryButton';
import useFetchWeeklyActivity from '../../../../features/logbook/useFetchWeeklyActivity';

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
  const { logbookDaily, loading } = useFetchDailyLogbook();
  const [openModal, setOpenModal] = useState(false);
  const { weeklyActivity } = useFetchWeeklyActivity();
  console.log('🚀 ~ LogbookOverallCard ~ weeklyActivity:', weeklyActivity);

  const handleDisableButton = () => {
    const checkCompleteLog = logbookDaily.slice(0, 5).every((element) => element.isComplete);
    if (checkCompleteLog) {
      console.log('all data is complete');
      return false;
    } else {
      console.log('some data is not compelete');
      return true;
    }
  };
  handleDisableButton();

  const { logbook_id } = useParams();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <div className="flex flex-col gap-5 border border-neutral-300 rounded-[24px] p-4 w-full">
      <div className="flex justify-between">
        {loading ? (
          <Placeholder />
        ) : (
          logbookDaily.slice(0, 5).map((item) => (
            <div key={item.logday_id} className={`flex items-center justify-center border border-neutral-300 ${item.isComplete && 'bg-hoverColor text-white border-none'} rounded-full h-10 w-10 text-base`}>
              <p>{weekDay(item.date_intern)[0]}</p>
            </div>
          ))
        )}
      </div>
      {weeklyActivity.log_description ? (
        <div>
          <p className="text-gray-400 text-sm">Hasil kerja kamu minggu ini</p>
          <p>{weeklyActivity.log_description}</p>
        </div>
      ) : (
        <>
          <PrimaryButton text={'Laporan Mingguan'} onClick={() => handleOpenModal()} disable={handleDisableButton()} />
          <div className="p-2 bg-gray-100 rounded-2xl">
            <p className="text-gray-400 text-center">Laporan mingguan baru bisa digunakan setelah laporan harian terisi semua</p>
          </div>
        </>
      )}
      {openModal && <ModalWeeklyForm id={logbook_id} isOpen={openModal} closeModal={() => setOpenModal(false)} />}
    </div>
  );
};

export default LogbookOverallCard;
