import { Link } from 'react-router-dom';
import { ArrowIcon, FileIcon } from '../../../components/Icons';
import ModalInternshipDocs from '../../../components/ModalInternshipDocument/ModalInternshipDocs';
import { formatDate } from '../../../utils/formatDate';
import { useState } from 'react';
import { useUserContext } from '../../../hooks/useUserContext';
import useFetchReportByInternship from '../../../features/report/useFetchReportByInternship';
import useFetchWeeklyLogbook from '../../../features/logbook/useFetchWeeklyLogbook';
import PropTypes from 'prop-types';
import useFetchInternshipById from '../../../features/internship/useFetchInternshipById';
import _ from 'lodash';

const handleCheckLogbook = (logbookWeekly) => {
  const checkCompleteLog = logbookWeekly.every((element) => element.status == 'Sudah disetujui');

  console.log('🚀 ~ handleCheckLogbook ~ checkCompleteLog:', checkCompleteLog);
  if (!checkCompleteLog) {
    console.log('some data are not validated by dosen');
    return false;
  } else {
    console.log('all data are validated');
    return true;
  }
};

const getStatusStyle = (status) => {
  switch (status) {
    case 'Belum diterima':
      return { color: 'bg-gray-300 text-black', text: 'Belum diterima' };
    case 'Disetujui':
      return { color: 'bg-green-500 text-white', text: 'Disetujui' };
    case 'Tidak disetujui':
      return { color: 'bg-red-500 text-white', text: 'Tidak disetujui' };
    default:
      return { color: '', text: '' };
  }
};

const DetailCard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const { internshipByID } = useFetchInternshipById();
  const { reportIntern, loading: loadingLog } = useFetchReportByInternship();

  let status = getStatusStyle(internshipByID.status);
  const handleOpenModal = (type) => {
    setOpenModal(true);
    setModalType(type);
  };

  const { logbookWeekly } = useFetchWeeklyLogbook();

  const { userLoggedInData } = useUserContext();
  const checkLogbook = handleCheckLogbook(logbookWeekly);

  const renderInternshipLinks = () => {
    if (internshipByID.status === 'Belum diterima') {
      return null;
    }

    return (
      <>
        <LogbookLink userID={userLoggedInData?.id} internshipID={internshipByID?.internship_id} />
        {loadingLog ? <LoadingLogbookPlaceholder /> : checkLogbook && <ReportLink internshipID={internshipByID?.internship_id} reportIntern={reportIntern} />}
      </>
    );
  };

  const LogbookLink = ({ userID, internshipID }) => (
    <Link
      to={`/kegiatan-magang/logbook/${userID}/${internshipID}`}
      state={{ internshipID }}
      className="flex border items-center border-gray-400 bg-white rounded-xl p-4 hover:bg-hoverColor hover:text-white active:bg-activeColor transition-all"
    >
      <p className="flex flex-1 font-bold text-base">Logbook</p>
      <ArrowIcon />
    </Link>
  );

  const LoadingLogbookPlaceholder = () => (
    <div className="flex border items-center rounded-xl p-4 bg-gray-300 animate-pulse">
      <p className="flex flex-1 font-bold text-base animate-pulse">Checking logbook data</p>
      <ArrowIcon />
    </div>
  );

  const ReportLink = ({ internshipID, reportIntern }) =>
    reportIntern ? (
      <Link to={`/report/detail/${reportIntern[0]?.report_id}`} className="flex border items-center border-gray-400 rounded-xl p-4 hover:bg-hoverColor hover:text-white active:bg-activeColor transition-all bg-white">
        <p className="flex flex-1 font-bold text-base">Hasil Laporan Akhir</p>
        <ArrowIcon />
      </Link>
    ) : (
      <Link to={`/report/upload/${internshipID}`} state={{ internshipID }} className="flex border items-center border-gray-400 bg-white rounded-xl p-4 hover:bg-hoverColor hover:text-white active:bg-activeColor transition-all">
        <p className="flex flex-1 font-bold text-base">Laporan Akhir</p>
        <ArrowIcon />
      </Link>
    );

  // prop checking
  LogbookLink.propTypes = {
    userID: PropTypes.number,
    internshipID: PropTypes.number,
  };
  ReportLink.propTypes = {
    reportIntern: PropTypes.any,
    internshipID: PropTypes.number,
  };
  return (
    <div className="flex flex-col gap-4 bg-white border border-gray-300 rounded-xl p-4">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-2 ">
          <h1 className="font-bold text-2xl">{_.capitalize(internshipByID.instance)}</h1>
          <div className="flex items-end shrink-0 flex-col gap-2">
            <div className="rounded-xl border border-gray-300 p-2 bg-gray-100">
              <h1>Status</h1>
              <div className={`h-fit p-2 rounded-md w-fit ${status.color}`}>{status.text}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-sm">
          <p className="text-gray-400">Periode magang</p>
          <p className="font-bold">
            {formatDate(internshipByID.start_intern)} - {formatDate(internshipByID.end_intern)}
          </p>
        </div>
        <div className="flex flex-col text-sm">
          <p className="text-gray-400">Kontak Perusahaan</p>
          <p className="font-bold">{internshipByID.phone}</p>
        </div>
        <div className="flex flex-col text-sm">
          <p className="text-gray-400">Lokasi</p>
          <p className="font-bold">{internshipByID.location}</p>
        </div>
        <div className="flex flex-col text-sm">
          <p className="text-gray-400">Tipe Magang</p>
          <p className="font-bold">{internshipByID.type}</p>
        </div>
        <div className="flex flex-col text-sm">
          <p className="text-gray-400">Deskripsi Perusahaan</p>
          <p className="font-bold">{internshipByID.description}</p>
        </div>
        {internshipByID.lecturer_note && (
          <div className="flex flex-col text-sm">
            <p className="text-gray-400">Catatan dosen</p>
            <p className="font-bold">{internshipByID.lecturer_note}</p>
          </div>
        )}
      </div>

      <h1 className="font-bold text-base">Dokumen Persyaratan Magang</h1>
      <div className="flex flex-col gap-2 col-span-2">
        <div className="flex items-baseline gap-2">
          <p className="text-sm text-gray-500 font-bold">Surat bersedia dosen magang:</p>
          <button className="w-fit bg-primaryColor text-white p-2 rounded-xl hover:bg-hoverColor active:bg-activeColor duration-150 " type="button" onClick={() => handleOpenModal('lecture_docu')}>
            <FileIcon />
          </button>
        </div>

        <div className="flex items-baseline gap-2">
          <p className="text-sm text-gray-500 font-bold">Surat permohonan magang dari kampus:</p>
          <button className="w-fit bg-primaryColor text-white p-2 rounded-xl hover:bg-hoverColor active:bg-activeColor duration-150 " type="button" onClick={() => handleOpenModal('campus_docu')}>
            <FileIcon />
          </button>
        </div>

        <div className="flex items-baseline gap-2">
          <p className="text-sm text-gray-500 font-bold">Surat magang dari perusahaan:</p>
          <button className="w-fit bg-primaryColor text-white p-2 rounded-xl hover:bg-hoverColor active:bg-activeColor duration-150 " type="button" onClick={() => handleOpenModal('instance_docu')}>
            <FileIcon />
          </button>
        </div>
      </div>

      {openModal && <ModalInternshipDocs id={internshipByID} isOpen={openModal} closeModal={() => setOpenModal(false)} modalType={modalType} />}

      {/* Render internship link */}
      {renderInternshipLinks()}
    </div>
  );
};

export default DetailCard;
