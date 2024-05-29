import PropTypes from 'prop-types';
import { formatDate } from '../../../../../utils/formatDate';
import { useState } from 'react';
import ModalInternshipDocs from '../../../../../components/ModalInternshipDocument/ModalInternshipDocs';
import { FileIcon } from '../../../../../components/Icons';
import FormInternshipValidation from './FormInternshipValidation';

const DataInternship = ({ data, loading }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const handleOpenModal = (type) => {
    setOpenModal(true);
    setModalType(type);
  };

  let statusColor;
  let statusText;
  switch (data.status) {
    case 'Belum diterima':
      statusColor = 'bg-gray-300';
      statusText = 'Belum diterima';
      break;
    case 'Disetujui':
      statusColor = 'bg-green-500 text-white';
      statusText = 'Sudah disetujui';
      break;
    case 'Tidak disetujui':
      statusColor = 'bg-red-500 text-white';
      statusText = 'Tidak disetujui';
      break;
  }

  return (
    <div className="bg-white rounded-xl w-full col-span-3 border border-neutral-200 p-5 ">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Data Internship</h1>
        <div className="flex flex-col">
          <div className={`p-3 rounded-xl font-bold ${statusColor}`}>{statusText}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-10">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <h1 className="text-sm text-gray-400">Perusahaan/Instansi</h1>
            {loading ? <p className="bg-gray-500 h-5 animate-pulse rounded-md w-full"></p> : <p className="text-sm font-bold text-gray-500">{data.instance}</p>}
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm text-gray-400">Tipe Magang</h1>
            {loading ? <p className="bg-gray-500 h-5 animate-pulse rounded-md w-full"></p> : <p className="text-sm font-bold text-gray-500">{data.type}</p>}
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm text-gray-400">Kontak Perusahaan</h1>
            {loading ? <p className="bg-gray-500 h-5 animate-pulse rounded-md w-full"></p> : <p className="text-sm font-bold text-gray-500">{data.phone}</p>}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <h1 className="text-sm text-gray-400">Periode Magang</h1>
            {loading ? (
              <p className="bg-gray-500 h-5 animate-pulse rounded-md w-full"></p>
            ) : (
              <p className="text-sm font-bold text-gray-500">
                {formatDate(data.start_intern)} - {formatDate(data.end_intern)}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm text-gray-400">Lokasi</h1>
            {loading ? <p className="bg-gray-500 h-5 animate-pulse rounded-md w-full"></p> : <p className="text-sm font-bold text-gray-500">{data.location}</p>}
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm text-gray-400">ID Kegiatan</h1>
            {loading ? <p className="bg-gray-500 h-5 animate-pulse rounded-md w-full"></p> : <p className="text-sm font-bold text-gray-500">{data.internship_id}</p>}
          </div>
        </div>
        <div className="flex flex-col col-span-2">
          <h1 className="text-sm text-gray-400">Catatan dosen</h1>
          <p className="text-sm font-bold text-gray-500">{data.lecturer_note}</p>
        </div>

        <h1 className="text-sm text-gray-400">Dokumen Magang Mandiri</h1>

        <div className="flex flex-col gap-2 col-span-2">
          <div className="flex items-baseline gap-2">
            <p className="text-sm text-gray-500 font-bold">Surat bersedia dosen magang:</p>
            <button className="w-fit bg-primaryColor text-white p-2 rounded-xl hover:bg-hoverColor duration-150 " type="button" onClick={() => handleOpenModal('lecture_docu')}>
              <FileIcon />
            </button>
          </div>

          <div className="flex items-baseline gap-2">
            <p className="text-sm text-gray-500 font-bold">Surat magang dari kampus:</p>
            <button className="w-fit bg-primaryColor text-white p-2 rounded-xl hover:bg-hoverColor duration-150 " type="button" onClick={() => handleOpenModal('campus_docu')}>
              <FileIcon />
            </button>
          </div>

          <div className="flex items-baseline gap-2">
            <p className="text-sm text-gray-500 font-bold">Surat magang dari perusahaan:</p>
            <button className="w-fit bg-primaryColor text-white p-2 rounded-xl hover:bg-hoverColor duration-150 " type="button" onClick={() => handleOpenModal('instance_docu')}>
              <FileIcon />
            </button>
          </div>
        </div>

        <FormInternshipValidation />

        {openModal && <ModalInternshipDocs id={data} isOpen={openModal} closeModal={() => setOpenModal(false)} modalType={modalType} />}
      </div>
    </div>
  );
};

DataInternship.propTypes = {
  data: PropTypes.any,
  loading: PropTypes.bool,
};

export default DataInternship;
