import { Link } from 'react-router-dom';
import { ArrowIcon, Spinner } from '../../../components/Icons';
import SidebarReport from '../SidebarReport';
import useFetchReportById from '../../../features/report/useFetchReportById';
import { weekDay } from '../../../utils/formatDate';
import DOMPurify from 'dompurify';
import _ from 'lodash';
import ModalReport from './ModalReport';
import { useState } from 'react';
import { Button } from 'flowbite-react';

const DetailReport = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const { reportDetail, loading } = useFetchReportById();
  console.log('🚀 ~ DetailReport ~ reportDetail:', reportDetail);
  const sanitizeContent = DOMPurify.sanitize(reportDetail.note);

  let color;
  switch (reportDetail.status) {
    case 'belum diterima':
      color = 'text-gray-500';
      break;
    case 'sudah diterima':
      color = 'text-green-500';
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
          <Link to="/report" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all">
            <ArrowIcon />
          </Link>
          {loading ? (
            <Spinner />
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <h1 className="text-xl font-bold">{reportDetail.title}</h1>
                <p className="text-xs text-gray-400">Dikirim pada hari {weekDay(reportDetail.createdAt)}</p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col bg-gray-200 w-fit p-2 rounded-lg gap-2">
                  <p>Status</p>
                  <p className={`border border-gray-400 w-fit p-1 rounded-md  ${color}`}>{_.capitalize(reportDetail.status)}</p>
                </div>
                <div>
                  <p className="text-sm font-bold">Keterangan laporan</p>
                  <p dangerouslySetInnerHTML={{ __html: sanitizeContent }} />
                </div>
                <div className="flex flex-col gap-2">
                  <Button color={null} className="border border-gray-400 hover:bg-primaryColor active:bg-hoverColor hover:text-white hover:border-white" onClick={() => handleModal('intern_complete_file')}>
                    Surat selesai magang
                  </Button>

                  <Button color={null} className="border border-gray-400 hover:bg-primaryColor active:bg-hoverColor hover:text-white hover:border-white" onClick={() => handleModal('intern_final_report')}>
                    Laporan akhir magang
                  </Button>

                  <Button color={null} className="border border-gray-400 hover:bg-primaryColor active:bg-hoverColor hover:text-white hover:border-white" onClick={() => handleModal('intern_score_file')}>
                    Penilaian dari perusahaan
                  </Button>
                </div>

                {openModal && <ModalReport report={reportDetail} isOpen={openModal} closeModal={() => setOpenModal(false)} modalType={modalType} />}
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
