import { Link, useLocation } from 'react-router-dom';
import { ArrowIcon, Spinner } from '../../../components/Icons';
import { useInternshipContext } from '../../../hooks/useInternshipContext';
import InternshipNotFound from '../InternshipNotFound';
import SidebarDetailInternship from './SidebarDetailInternship';
import { formatDate } from '../../../utils/formatDate';
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';
import { useEffect, useState } from 'react';
import { Button } from 'flowbite-react';
import ModalInternshipDocs from './ModalInternshipDocs';
import { useUserContext } from '../../../hooks/useUserContext';

const DetailInternship = () => {
  const { loadingDetail, internshipByID } = useInternshipContext();
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const { userLoggedInData } = useUserContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleOpenModal = (type) => {
    setOpenModal(true);
    setModalType(type);
  };

  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="flex flex-col gap-4 lg:col-span-2 col-span-3">
        <Link to="/kegiatan-magang" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all">
          <ArrowIcon />
        </Link>
        {loadingDetail ? (
          <Spinner />
        ) : !internshipByID ? (
          <InternshipNotFound />
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <h1 className="font-bold text-2xl">{capitalizeFirstLetter(internshipByID.instance)}</h1>
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
                <p className="text-gray-400">Deskripsi Perusahaan</p>
                <p className="font-bold">{internshipByID.description}</p>
              </div>
              <div className="flex flex-col text-sm">
                <p className="text-gray-400">Tipe Magang</p>
                <p className="font-bold">{internshipByID.type}</p>
              </div>
            </div>

            <h1 className="font-bold text-base">Dokumen Persyaratan Magang</h1>
            <Button color={null} className="border border-gray-400 hover:bg-hoverColor active:bg-primaryColor hover:text-white" onClick={() => handleOpenModal('lecture_docu')}>
              Surat bersedia dosen magang
            </Button>

            <Button color={null} className="border border-gray-400 hover:bg-hoverColor active:bg-primaryColor hover:text-white" onClick={() => handleOpenModal('campus_docu')}>
              Surat magang dari kampus
            </Button>

            <Button color={null} className="border border-gray-400 hover:bg-hoverColor active:bg-primaryColor hover:text-white" onClick={() => handleOpenModal('instance_docu')}>
              Surat magang dari perusahaan
            </Button>

            {openModal && <ModalInternshipDocs id={internshipByID} isOpen={openModal} closeModal={() => setOpenModal(false)} modalType={modalType} />}

            <Link
              to={`/kegiatan-magang/logbook/${userLoggedInData.id}/${internshipByID?.internship_id}`}
              state={{ internshipID: internshipByID.internship_id }}
              className=" flex border items-center border-gray-400 rounded-xl p-4 hover:bg-hoverColor hover:text-white transition-all"
            >
              <p className="flex flex-1 font-bold text-base ">Logbook</p>
              <ArrowIcon />
            </Link>
          </div>
        )}
      </div>
      <SidebarDetailInternship />
    </div>
  );
};

export default DetailInternship;
