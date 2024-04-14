import { useEffect, useState } from 'react';
import { Spinner } from '../../../components/Icons';
import PrimaryButton from '../../../components/PrimaryButton';
import useFetchDailyLogbook from '../../../features/logbook/useFetchDailyLogbook';
import { weekDay } from '../../../utils/formatDate';
import { useLogbookDailyContext } from '../../../hooks/useLogbookDailyContext';
import ModalDailyForm from './ModalDailyForm';

const LogbookWeek = () => {
  const [openModal, setOpenModal] = useState(false);
  const [logId, setLogId] = useState(null);
  const [dateIntern, setDateIntern] = useState(null);
  const { logbookDaily, loading } = useFetchDailyLogbook();
  const { loadingUpdate } = useLogbookDailyContext();

  useEffect(() => {
    if (!loadingUpdate) {
      setOpenModal(false);
    }
  }, [loadingUpdate]);

  const handleOpenModal = (id, dateIntern) => {
    setOpenModal(true);
    setLogId(id);
    setDateIntern(dateIntern);
  };

  return (
    <div className="flex flex-col gap-5">
      {loading ? (
        <Spinner />
      ) : (
        logbookDaily.slice(0, 5).map((item) => (
          <div key={item.date_intern} className="flex flex-col justify-center border border-neutral-300 rounded-[32px]">
            <div className="flex border-b items-center gap-2 border-neutral-200 rounded-tl-[32px] rounded-tr-[32px] p-4 font-bold">
              <div className={`h-10 w-10 rounded-full ${item.isComplete && 'bg-hoverColor border-none'} border border-neutral-200`}></div>
              <div className="flex flex-col">
                <p>{weekDay(item.date_intern)}</p>
              </div>
            </div>
            <div className="flex p-4">
              {item.isComplete ? (
                <div className="flex flex-col gap-2">
                  <p className="text-gray-500 text-sm">Hasil kerja kamu hari ini</p>
                  <p className="text-start">{item.log_description}</p>
                </div>
              ) : (
                <div className="flex m-auto">
                  <PrimaryButton text="Buat Laporan Harian" onClick={() => handleOpenModal(item.logday_id, item.date_intern)} />
                </div>
              )}
            </div>
          </div>
        ))
      )}
      {openModal && <ModalDailyForm logdayID={logId} date={dateIntern} isOpen={openModal} closeModal={() => setOpenModal(false)} />}
    </div>
  );
};

export default LogbookWeek;
