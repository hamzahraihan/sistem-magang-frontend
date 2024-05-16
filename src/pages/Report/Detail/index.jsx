import { Link } from 'react-router-dom';
import { ArrowIcon, CancelIcon, CheckIcon, FileIcon, Spinner } from '../../../components/Icons';
import SidebarReport from '../SidebarReport';
import useFetchReportById from '../../../features/report/useFetchReportById';
import { weekDay } from '../../../utils/formatDate';
import DOMPurify from 'dompurify';
import ModalReport from './ModalReport';
import { useState } from 'react';

const DetailReport = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const { reportIntern, loading } = useFetchReportById();
  console.log('🚀 ~ DetailReport ~ reportIntern:', reportIntern);
  const sanitizeContent = DOMPurify.sanitize(reportIntern.note);

  let statusColor;
  let statusText;
  let statusIcon;
  switch (reportIntern.status) {
    case 'Belum disetujui':
      statusColor = 'border border-gray-400';
      statusText = 'Belum disetujui';
      break;
    case 'Valid':
      statusColor = 'bg-green-400 text-white';
      statusText = 'Valid';
      statusIcon = <CheckIcon />;
      break;
    case 'Perlu direvisi':
      statusColor = 'bg-red-500 text-white';
      statusText = 'Perlu direvisi';
      statusIcon = <CancelIcon />;
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
                <h1 className="text-xl font-bold">{reportIntern.title}</h1>
                <p className="text-xs text-gray-400">Dikirim pada hari {weekDay(reportIntern.updatedAt)}</p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col bg-gray-200 w-fit p-2 rounded-lg gap-2">
                  <p>Status</p>
                  <div className="flex items-center gap-2">
                    <p className={`flex items-center justify-between gap-2 text-center py-1 px-5 rounded-md  ${statusColor}`}>
                      {statusText} {statusIcon}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-bold">Keterangan laporan</p>
                  <p dangerouslySetInnerHTML={{ __html: sanitizeContent }} />
                </div>
                {reportIntern.lecturer_note && (
                  <div className="flex flex-col">
                    <p className="text-sm font-bold">Catatan dosen</p>
                    <p>{reportIntern.lecturer_note}</p>
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

                {openModal && <ModalReport report={reportIntern} isOpen={openModal} closeModal={() => setOpenModal(false)} modalType={modalType} />}
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
