import { Link } from 'react-router-dom';
import { ArrowIcon, Spinner } from '../../../components/Icons';
import InternshipNotFound from '../InternshipNotFound';
import SidebarDetailInternship from './SidebarDetailInternship';
import { formatDate } from '../../../utils/formatDate';
import { useState } from 'react';
import { Button } from 'flowbite-react';
import ModalInternshipDocs from '../../../components/ModalInternshipDocument/ModalInternshipDocs';
import { useUserContext } from '../../../hooks/useUserContext';
import useFetchInternshipById from '../../../features/internship/useFetchInternshipById';
import _ from 'lodash';
import useFetchReportByInternship from '../../../features/report/useFetchReportByInternship';

const DetailInternship = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const { loading, internshipByID } = useFetchInternshipById();
  const { reportIntern } = useFetchReportByInternship();
  const { userLoggedInData } = useUserContext();

  const handleOpenModal = (type) => {
    setOpenModal(true);
    setModalType(type);
  };

  let statusColor;
  let statusText;
  switch (internshipByID.status) {
    case 'Belum':
      statusColor = ' bg-gray-300 text-black';
      statusText = 'Belum diterima';
      break;
    case 'Valid':
      statusColor = 'bg-green-500 text-white';
      statusText = 'Valid';
      break;
    case 'Tidak disetujui':
      statusColor = 'bg-red-500 text-white';
      statusText = 'Tidak disetujui';
      break;
    default:
      break;
  }

  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="flex flex-col gap-4 lg:col-span-2 col-span-3">
        <Link to="/kegiatan-magang" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white" onClick={window.scrollTo(0, 0)}>
          <ArrowIcon />
        </Link>
        {loading ? (
          <div className="flex items-center justify-center h-80 w-full">
            <Spinner />
          </div>
        ) : !internshipByID ? (
          <InternshipNotFound />
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between gap-2">
                <h1 className="font-bold text-2xl">{_.capitalize(internshipByID.instance)} Lorem ipsum dolor sit amet consectetur adipisicing elit. Et facere iusto illum. Dicta facere harum tempora quod deserunt, quaerat nemo?</h1>
                <div className="flex items-end shrink-0 flex-col gap-2">
                  <div className={`h-fit p-2 rounded-md w-fit ${statusColor}`}>{statusText}</div>
                  <Link to="/" className="h-fit p-2 bg-white hover:bg-gray-50 active:bg-gray-100 duration-150 border border-gray-300 rounded-md w-fit cursor-pointer">
                    Ubah Laporan
                  </Link>
                </div>
              </div>
              <div className="flex flex-col text-sm">
                <p className="text-gray-400">Periode magang</p>
                <p className="font-bold">
                  {formatDate(internshipByID.start_intern)} - {formatDate(internshipByID.end_intern)}
                </p>
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
            <Button color={null} className="border border-gray-400 hover:bg-hoverColor active:bg-primaryColor hover:text-white bg-white" onClick={() => handleOpenModal('lecture_docu')}>
              Surat bersedia dosen magang
            </Button>

            <Button color={null} className="border border-gray-400 hover:bg-hoverColor active:bg-primaryColor hover:text-white bg-white" onClick={() => handleOpenModal('campus_docu')}>
              Surat magang dari kampus
            </Button>

            <Button color={null} className="border border-gray-400 hover:bg-hoverColor active:bg-primaryColor hover:text-white bg-white" onClick={() => handleOpenModal('instance_docu')}>
              Surat magang dari perusahaan
            </Button>

            {openModal && <ModalInternshipDocs id={internshipByID} isOpen={openModal} closeModal={() => setOpenModal(false)} modalType={modalType} />}

            <Link
              to={`/kegiatan-magang/logbook/${userLoggedInData?.id}/${internshipByID?.internship_id}`}
              state={{ internshipID: internshipByID.internship_id }}
              className=" flex border items-center border-gray-400 bg-white rounded-xl p-4 hover:bg-hoverColor hover:text-white transition-all"
            >
              <p className="flex flex-1 font-bold text-base ">Logbook</p>
              <ArrowIcon />
            </Link>
            {reportIntern.length === 0 ? (
              <Link
                to={`/report/upload/${internshipByID?.internship_id}`}
                state={{ internshipID: internshipByID.internship_id }}
                className=" flex border items-center border-gray-400 bg-white rounded-xl p-4 hover:bg-hoverColor hover:text-white transition-all "
              >
                <p className="flex flex-1 font-bold text-base ">Laporan Akhir</p>
                <ArrowIcon />
              </Link>
            ) : (
              <Link to={`/report/detail/${reportIntern[0]?.report_id}`} className=" flex border items-center border-gray-400 rounded-xl p-4 hover:bg-hoverColor hover:text-white transition-all bg-white">
                <p className="flex flex-1 font-bold text-base ">Hasil Laporan Akhir</p>
                <ArrowIcon />
              </Link>
            )}
          </div>
        )}
      </div>
      <SidebarDetailInternship />
    </div>
  );
};

export default DetailInternship;
