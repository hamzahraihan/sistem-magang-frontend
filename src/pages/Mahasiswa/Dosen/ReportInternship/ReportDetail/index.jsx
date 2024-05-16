import { Link } from 'react-router-dom';
import { ArrowIcon, FileIcon } from '../../../../../components/Icons';
import useFetchReportById from '../../../../../features/report/useFetchReportById';
import { useState } from 'react';
import ModalReport from '../../../../Report/Detail/ModalReport';
import { useFormik } from 'formik';
import * as yup from 'yup';
import _ from 'lodash';
import { weekDay } from '../../../../../utils/formatDate';
import { useReportInternContext } from '../../../../../hooks/useReportInternContext';

const ReportDetail = () => {
  const { loading, reportIntern } = useFetchReportById();
  const { loadingUpdate, handleStatusReport } = useReportInternContext();
  console.log('🚀 ~ ReportDetail ~ reportIntern:', reportIntern);

  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const handleModal = (type) => {
    setOpenModal(true);
    setModalType(type);
  };

  const formik = useFormik({
    initialValues: {
      lecturer_note: '',
      status: 'Perlu direvisi',
    },
    onSubmit: (values) => {
      handleStatusReport(values);
    },
    validationSchema: yup.object().shape({
      lecturer_note: yup.string().required('Wajib diisi bila perlu direvisi'),
      status: yup.string().required(),
    }),
  });

  let statusColor;
  let statusText;
  switch (reportIntern.status) {
    case 'Belum disetujui':
      statusColor = 'bg-gray-300 text-black';
      statusText = 'Belum disetujui';
      break;
    case 'Valid':
      statusColor = 'bg-green-500 text-white';
      statusText = 'Valid';
      break;
    case 'Perlu direvisi':
      statusColor = 'bg-red-500 text-white';
      statusText = 'Perlu direvisi';
      break;
    default:
      break;
  }

  return (
    <div className="col-span-3 pb-10">
      <div className="flex flex-col lg:col-span-2 col-span-3">
        <Link to="/dashboard/mahasiswa/laporan-akhir" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white mb-2">
          <ArrowIcon />
        </Link>
        <div className="flex flex-col gap-4 bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex mb-5 justify-between">
            <h1 className="text-xl font-bold">Detail Laporan Akhir</h1>
            <div className={`flex items-center justify-center rounded-xl ${statusColor} w-28 h-10 font-bold`}>{statusText}</div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-gray-300">Nama</h1>
            {loading ? (
              <div className="bg-gray-400 rounded-md h-5 w-72 animate-pulse"></div>
            ) : (
              <div className="text-sm font-bold text-gray-500">{_.upperCase(`${reportIntern.Mahasiswa?.first_name} ${reportIntern.Mahasiswa?.last_name}`)}</div>
            )}
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-gray-300">Tempat Magang</h1>
            <p className="text-sm font-bold text-gray-500">{reportIntern.Internship?.instance}</p>
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-gray-300">Laporan dikirim pada</h1>
            <p className="text-sm font-bold text-gray-500">{weekDay(reportIntern.createdAt)}</p>
          </div>
          {reportIntern.lecturer_note && (
            <div className="flex flex-col">
              <h1 className="text-sm font-bold text-gray-300">Catatan Dosen</h1>
              <p className="text-sm font-bold text-gray-500">{reportIntern.lecturer_note}</p>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <h1 className="text-sm text-gray-300 font-bold">File Laporan Akhir Magang</h1>
            <div className="flex items-baseline gap-2">
              <p className="text-sm text-gray-500 font-bold">Surat Selesai Magang:</p>
              <button className="w-fit bg-primaryColor text-white p-2 rounded-xl hover:bg-hoverColor duration-150 " type="button" onClick={() => handleModal('intern_complete_file')}>
                <FileIcon />
              </button>
            </div>

            <div className="flex items-baseline gap-2">
              <p className="text-sm text-gray-500 font-bold"> Laporan akhir magang:</p>
              <button className="w-fit bg-primaryColor text-white p-2 rounded-xl hover:bg-hoverColor duration-150 " type="button" onClick={() => handleModal('intern_final_report')}>
                <FileIcon />
              </button>
            </div>

            <div className="flex items-baseline gap-2">
              <p className="text-sm text-gray-500 font-bold">Penilaian dari perusahaan:</p>
              <button className="w-fit bg-primaryColor text-white p-2 rounded-xl hover:bg-hoverColor duration-150 " type="button" onClick={() => handleModal('intern_score_file')}>
                <FileIcon />
              </button>
            </div>

            {openModal && <ModalReport report={reportIntern} isOpen={openModal} closeModal={() => setOpenModal(false)} modalType={modalType} />}

            <form className="flex flex-col" onSubmit={formik.handleSubmit}>
              <label htmlFor="lecturer_note" className="text-sm text-gray-400">
                Catatan <span className="text-red-600">*Wajib diisi bila perlu direvisi</span>
              </label>
              <textarea id="lecturer_note" name="lecturer_note" className="rounded-lg bg-gray-200 border-0 text-xs" rows={5} value={formik.values.lecturer_note} onChange={(e) => formik.setFieldValue(e.target.name, e.target.value)} />
              {formik.errors.lecturer_note}

              <div className="flex lg:flex-row flex-col gap-2 lg:w-fit w-full mt-4">
                <button
                  type="button"
                  className="flex items-center justify-center h-10 lg:w-20 w-full bg-green-500 text-white rounded-md hover:bg-green-600 active:bg-green-700 duration-150 disabled:bg-green-200 disabled:cursor-default"
                  onClick={() => handleStatusReport({ status: 'Valid', lecturer_note: '' })}
                  disabled={loadingUpdate}
                >
                  Validasi
                </button>

                <button
                  type="submit"
                  className="flex items-center justify-center h-10 lg:w-24 w-full bg-red-600 text-white rounded-md hover:bg-red-700 active:bg-red-800 duration-150 disabled:bg-red-200 disabled:cursor-default"
                  disabled={loadingUpdate}
                >
                  Perlu direvisi
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
