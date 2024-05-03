import PropTypes from 'prop-types';
import { formatDate } from '../../../../../utils/formatDate';
import { Button } from 'flowbite-react';
import { useState } from 'react';
import ModalInternshipDocs from '../../../../../components/ModalInternshipDocument/ModalInternshipDocs';

const DataLogbook = ({ data, loading }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const handleOpenModal = (type) => {
    setOpenModal(true);
    setModalType(type);
  };
  return (
    <div className="bg-white rounded-xl w-full col-span-3 border border-neutral-200 p-5 ">
      <h1 className="text-xl font-bold">Logbook Mahasiswa</h1>
      <div className="grid grid-cols-2 gap-4 mt-10">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-gray-300">Perusahaan/Instansi</h1>
            {loading ? <p className="bg-gray-500 h-5 animate-pulse rounded-md w-full"></p> : <p className="text-sm font-bold text-gray-500">{data.instance}</p>}
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-gray-300">Tipe Magang</h1>
            {loading ? <p className="bg-gray-500 h-5 animate-pulse rounded-md w-full"></p> : <p className="text-sm font-bold text-gray-500">{data.type}</p>}
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-gray-300">Kontak Perusahaan</h1>
            {loading ? <p className="bg-gray-500 h-5 animate-pulse rounded-md w-full"></p> : <p className="text-sm font-bold text-gray-500">{data.phone}</p>}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-gray-300">Periode Magang</h1>
            {loading ? (
              <p className="bg-gray-500 h-5 animate-pulse rounded-md w-full"></p>
            ) : (
              <p className="text-sm font-bold text-gray-500">
                {formatDate(data.start_intern)} - {formatDate(data.end_intern)}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-gray-300">Lokasi</h1>
            {loading ? <p className="bg-gray-500 h-5 animate-pulse rounded-md w-full"></p> : <p className="text-sm font-bold text-gray-500">{data.location}</p>}
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-gray-300">ID Kegiatan</h1>
            {loading ? <p className="bg-gray-500 h-5 animate-pulse rounded-md w-full"></p> : <p className="text-sm font-bold text-gray-500">{data.internship_id}</p>}
          </div>
        </div>

        <Button color={null} className="border border-gray-400 hover:bg-hoverColor active:bg-primaryColor hover:text-white bg-white col-span-2" onClick={() => handleOpenModal('lecture_docu')}>
          Surat bersedia dosen magang
        </Button>

        <Button color={null} className="border border-gray-400 hover:bg-hoverColor active:bg-primaryColor hover:text-white bg-white col-span-2" onClick={() => handleOpenModal('campus_docu')}>
          Surat magang dari kampus
        </Button>

        <Button color={null} className="border border-gray-400 hover:bg-hoverColor active:bg-primaryColor hover:text-white bg-white col-span-2" onClick={() => handleOpenModal('instance_docu')}>
          Surat magang dari perusahaan
        </Button>

        {openModal && <ModalInternshipDocs id={data} isOpen={openModal} closeModal={() => setOpenModal(false)} modalType={modalType} />}
      </div>
    </div>
  );
};

DataLogbook.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
};

export default DataLogbook;
