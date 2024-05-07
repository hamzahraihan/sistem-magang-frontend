import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../../../../components/Icons';
import useFetchWeeklyActivity from '../../../../../features/logbook/useFetchWeeklyActivity';
import useFetchUserByID from '../../../../../features/user/useFetchUserById';
import { weekDay } from '../../../../../utils/formatDate';

const LogbookWeeklyReport = () => {
  const { weeklyActivity } = useFetchWeeklyActivity();

  console.log('🚀 ~ LogbookWeeklyReport ~ logbookDaily:', weeklyActivity);

  const { userByID } = useFetchUserByID(weeklyActivity.mahasiswa_id);

  return (
    <div className="flex flex-col col-span-3 gap-4 mb-4">
      <Link
        to={`/dashboard/dosen/mahasiswa/internship-report/${weeklyActivity.internship_id}`}
        className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white"
      >
        <ArrowIcon />
      </Link>
      <div className="flex flex-col gap-5 bg-white rounded-xl w-full col-span-3 border border-neutral-200 p-5">
        <div className="container flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold">Detail Logbook</h1>
            <p className="text-sm text-gray-400">
              {userByID.first_name} {userByID.last_name}
            </p>
          </div>

          <div className="flex flex-col">
            <div className="font-bold text-white p-3 rounded-xl bg-red-600">{weeklyActivity.status}</div>
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-sm text-gray-400">Tanggal Dibuat</h1>
          <p className="text-sm text-gray-600 font-bold">{weekDay(weeklyActivity.createdAt)}</p>
        </div>

        <div className="flex flex-col">
          <h1 className="text-sm text-gray-400">Minggu Kegiatan</h1>
          <p className="text-sm text-gray-600 font-bold">{`Minggu ke- ${weeklyActivity.week + 1}`}</p>
        </div>

        <div className="flex flex-col">
          <h1 className="text-sm text-gray-400">Hasil Kegiatan</h1>
          <p className="text-sm text-gray-600 font-bold">{weeklyActivity.log_description}</p>
        </div>

        <form className="flex flex-col">
          <label htmlFor="lecture_note" className="text-sm text-gray-400">
            Catatan <span className="text-red-600">*Wajib diisi bila perlu direvisi</span>
          </label>
          <textarea id="lecture_note" name="lecture_note" className="rounded-lg bg-gray-200 border-0 text-xs" rows={5} />
        </form>

        <div className="flex gap-2 w-fit">
          <button className="bg-green-500 text-white p-3 rounded-md hover:bg-green-600 active:bg-green-700 duration-150">Validasi</button>
          <button className="bg-red-600 text-white p-3 rounded-md hover:bg-red-700 active:bg-red-800 duration-150">Perlu revisi</button>
        </div>
      </div>
    </div>
  );
};

export default LogbookWeeklyReport;
