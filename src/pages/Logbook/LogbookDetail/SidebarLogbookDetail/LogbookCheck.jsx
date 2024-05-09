import { useEffect, useState } from 'react';

import ModalWeeklyForm from './ModalWeeklyForm';
import useFetchDailyLogbook from '../../../../features/logbook/useFetchDailyLogbook';
import { weekDay } from '../../../../utils/formatDate';
import PrimaryButton from '../../../../components/PrimaryButton';
import useFetchWeeklyActivity from '../../../../features/logbook/useFetchWeeklyActivity';
import { useLogbookWeeklyActivityContext } from '../../../../hooks/useLogbookWeeklyActivityContext';
import { CancelIcon, CheckIcon, ClockIcon, Spinner } from '../../../../components/Icons';

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
  const [id, setId] = useState(null);
  const { weeklyActivity, loading: loadingWeekly } = useFetchWeeklyActivity();
  const { loadingUpdate } = useLogbookWeeklyActivityContext();

  let statusColor;
  let statusIcon;
  switch (weeklyActivity.status) {
    case 'Belum disetujui':
      statusColor = 'text-gray-500';
      statusIcon = <ClockIcon />;
      break;
    case 'Tidak disetujui':
      statusColor = 'text-hoverColor';
      statusIcon = <CancelIcon />;
      break;
    case 'Sudah disetujui':
      statusColor = 'text-green-500';
      statusIcon = <CheckIcon />;
      break;
  }

  useEffect(() => {
    if (!loadingUpdate) {
      setOpenModal(false);
    }
  }, [loadingUpdate]);

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

  const handleOpenModal = (id) => {
    setOpenModal(true);
    setId(id);
  };

  return (
    <>
      <div className="flex flex-col gap-5 border border-neutral-300 bg-white rounded-[24px] p-4 w-full">
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
        {loadingWeekly ? (
          <Spinner />
        ) : weeklyActivity.log_description ? (
          <div className="flex flex-col gap-2">
            <p className={`flex items-center gap-1 p-2 rounded-2xl bg-gray-200 ${statusColor} text-sm`}>
              {statusIcon}
              Status: {weeklyActivity.status}
            </p>
            {weeklyActivity.status == 'Tidak disetujui' && (
              <>
                <PrimaryButton text={'Laporan Mingguan'} onClick={() => handleOpenModal(weeklyActivity.logbook_id)} disable={handleDisableButton()} />
              </>
            )}
            <p className="text-gray-400 text-sm">Hasil kerja kamu minggu ini</p>
            <p>{weeklyActivity.log_description}</p>
          </div>
        ) : (
          <>
            <PrimaryButton text={'Laporan Mingguan'} onClick={() => handleOpenModal(weeklyActivity.logbook_id)} disable={handleDisableButton()} />
            <div className="p-2 bg-gray-100 rounded-2xl">
              <p className="text-gray-400 text-center">Laporan mingguan baru bisa digunakan setelah laporan harian terisi semua</p>
            </div>
          </>
        )}
        {openModal && <ModalWeeklyForm id={id} isOpen={openModal} closeModal={() => setOpenModal(false)} />}
      </div>
      {weeklyActivity.status == 'Tidak disetujui' && (
        <div className="flex flex-col gap-2 border border-neutral-300 bg-white rounded-[24px] p-4 w-full">
          <h1 className="text-sm text-gray-400">Catatan dari dosen</h1>
          <span className="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi molestias quisquam voluptas, sequi nam possimus sunt illum incidunt dolore quaerat!</span>
        </div>
      )}
    </>
  );
};

export default LogbookOverallCard;
