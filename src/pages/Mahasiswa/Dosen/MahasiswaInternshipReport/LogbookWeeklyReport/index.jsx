import { Link } from 'react-router-dom';
import { ArrowIcon, Spinner } from '../../../../../components/Icons';
import useFetchWeeklyActivity from '../../../../../features/logbook/useFetchWeeklyActivity';
import useFetchUserByID from '../../../../../features/user/useFetchUserById';
import { weekDay } from '../../../../../utils/formatDate';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLogbookWeeklyActivityContext } from '../../../../../hooks/useLogbookWeeklyActivityContext';

const LogbookWeeklyReport = () => {
  const { weeklyActivity } = useFetchWeeklyActivity();
  const { loading, userByID } = useFetchUserByID(weeklyActivity.mahasiswa_id);
  const { loadingUpdate, handleStatusLogbook } = useLogbookWeeklyActivityContext();

  const formik = useFormik({
    initialValues: {
      lecturer_note: '',
      status: 'Tidak disetujui',
    },
    onSubmit: (values) => {
      handleStatusLogbook(values);
    },
    validationSchema: yup.object().shape({
      lecturer_note: yup.string().required('Wajib diisi bila perlu direvisi'),
      status: yup.string().required(),
    }),
  });

  let statusColor;
  let statusText;
  switch (weeklyActivity.status) {
    case 'Belum disetujui':
      statusColor = 'bg-gray-300 text-black';
      statusText = 'Belum disetujui';
      break;
    case 'Sudah disetujui':
      statusColor = 'bg-green-500 text-white';
      statusText = 'Sudah disetujui';
      break;
    case 'Tidak disetujui':
      statusColor = 'bg-red-500 text-white';
      statusText = 'Tidak disetujui';
      break;
  }

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
              {loading ? (
                <div className="bg-gray-400 rounded-md h-5 w-72 animate-pulse"></div>
              ) : (
                <>
                  {userByID.first_name} {userByID.last_name}
                </>
              )}
            </p>
          </div>

          <div className="flex flex-col">
            <div className={`p-3 rounded-xl ${statusColor}`}>{statusText}</div>
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-sm text-gray-400">Tanggal Dibuat</h1>
          <p className="text-sm text-gray-600 font-bold">{weekDay(weeklyActivity.updatedAt)}</p>
        </div>

        <div className="flex flex-col">
          <h1 className="text-sm text-gray-400">Minggu Kegiatan</h1>
          <p className="text-sm text-gray-600 font-bold">{`Minggu ke- ${weeklyActivity.week + 1}`}</p>
        </div>

        <div className="flex flex-col">
          <h1 className="text-sm text-gray-400">Hasil Kegiatan</h1>
          <p className="text-sm text-gray-600 font-bold">{weeklyActivity.log_description}</p>
        </div>

        {weeklyActivity.lecturer_note && (
          <div className="flex flex-col">
            <h1 className="text-sm text-gray-400 ">Catatan dosen</h1>
            <p className="text-sm text-gray-600 font-bold">{weeklyActivity.lecturer_note}</p>
          </div>
        )}

        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          <label htmlFor="lecturer_note" className="text-sm text-gray-400">
            Catatan <span className="text-red-600">*Wajib diisi bila perlu direvisi</span>
          </label>
          <textarea id="lecturer_note" name="lecturer_note" className="rounded-lg bg-gray-200 border-0 text-xs" rows={5} value={formik.values.lecturer_note} onChange={(e) => formik.setFieldValue(e.target.name, e.target.value)} />
          {formik.errors.lecturer_note}

          <div className="flex gap-2 w-fit mt-4">
            <button
              type="button"
              className="flex items-center justify-center h-10 w-20 bg-green-500 text-white rounded-md hover:bg-green-600 active:bg-green-700 duration-150 disabled:bg-green-200 disabled:cursor-default"
              onClick={() => handleStatusLogbook({ status: 'Sudah disetujui', lecturer_note: 'disetujui' })}
              disabled={loadingUpdate}
            >
              {loadingUpdate ? <Spinner /> : 'Validasi'}
            </button>

            <button type="submit" className="flex items-center justify-center h-10 w-24 bg-red-600 text-white rounded-md hover:bg-red-700 active:bg-red-800 duration-150 disabled:bg-red-200 disabled:cursor-default" disabled={loadingUpdate}>
              {loadingUpdate ? <Spinner /> : 'Perlu direvisi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogbookWeeklyReport;
