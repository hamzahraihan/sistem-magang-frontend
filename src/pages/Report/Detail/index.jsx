import { Link } from 'react-router-dom';
import { ArrowIcon, FileIcon, Spinner } from '../../../components/Icons';
import SidebarReport from '../SidebarReport';
import useFetchReportById from '../../../features/report/useFetchReportById';
import { weekDay } from '../../../utils/formatDate';
import DOMPurify from 'dompurify';
import ModalReport from './ModalReport';
import { useState } from 'react';

const DetailReport = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const { reportDetail, loading } = useFetchReportById();
  console.log('🚀 ~ DetailReport ~ reportDetail:', reportDetail);
  const sanitizeContent = DOMPurify.sanitize(reportDetail.note);

  let statusColor;
  let statusText;
  switch (reportDetail.status) {
    case 'Belum disetujui':
      statusColor = 'bg-gray-300';
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
  }

  const handleModal = (type) => {
    setOpenModal(true);
    setModalType(type);
  };

  return (
    <div className="col-span-3 pb-10">
      <div className="grid grid-cols-3 gap-5">
        <div className="lg:order-first flex flex-col gap-4 lg:col-span-2 col-span-3 order-last">
          <Link to="/report" className="lg:flex hidden items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white">
            <ArrowIcon />
          </Link>
          {loading ? (
            <Spinner />
          ) : (
            <div className="flex flex-col gap-2 p-4 bg-white rounded-3xl border border-gray-200">
              <div className="flex flex-col">
                <h1 className="text-xl font-bold">{reportDetail.title}</h1>
                <p className="text-xs text-gray-400">Dikirim pada hari {weekDay(reportDetail.updatedAt)}</p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col bg-gray-200 w-fit p-2 rounded-lg gap-2">
                  <p>Status</p>
                  <p className={`border border-gray-400 w-fit p-1 rounded-md  ${statusColor}`}>{statusText}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-bold">Keterangan laporan</p>
                  <p dangerouslySetInnerHTML={{ __html: sanitizeContent }} />
                </div>
                {reportDetail.lecturer_note && (
                  <div className="flex flex-col">
                    <p className="text-sm font-bold">Catatan dosen</p>
                    <p>{reportDetail.lecturer_note}</p>
                  </div>
                )}
                <h1 className="text-sm font-bold">File Laporan Akhir Magang</h1>
                <div className="flex items-baseline gap-2">
                  <p className="text-sm font-bold">Surat Selesai Magang:</p>
                  <button className="w-fit bg-primaryColor text-white p-2 rounded-xl hover:bg-hoverColor duration-150 " type="button" onClick={() => handleModal('intern_complete_file')}>
                    <FileIcon />
                  </button>
                </div>

                <div className="flex items-baseline gap-2">
                  <p className="text-sm font-bold"> Laporan akhir magang:</p>
                  <button className="w-fit bg-primaryColor text-white p-2 rounded-xl hover:bg-hoverColor duration-150 " type="button" onClick={() => handleModal('intern_final_report')}>
                    <FileIcon />
                  </button>
                </div>

                <div className="flex items-baseline gap-2">
                  <p className="text-sm font-bold">Penilaian dari perusahaan:</p>
                  <button className="w-fit bg-primaryColor text-white p-2 rounded-xl hover:bg-hoverColor duration-150 " type="button" onClick={() => handleModal('intern_score_file')}>
                    <FileIcon />
                  </button>
                </div>

                {openModal && <ModalReport report={reportDetail} isOpen={openModal} closeModal={() => setOpenModal(false)} modalType={modalType} />}
              </div>
              <div className="flex gap-2">
                <button type="button" className="bg-red-600 text-white rounded-md p-2 hover:bg-red-700 active:bg-red-800 duration-150">
                  Hapus
                </button>
                <Link to="/report/update/" className="bg-green-500 hover:bg-green-600 active:bg-green-700 !text-white rounded-md p-2 duration-150">
                  Ubah
                </Link>
              </div>
            </div>
          )}
        </div>
        <SidebarReport />
      </div>
    </div>
  );
};

export default DetailReport;
