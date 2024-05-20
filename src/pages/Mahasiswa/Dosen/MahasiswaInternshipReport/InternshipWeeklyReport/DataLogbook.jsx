import PropTypes from 'prop-types';
import { formatDate } from '../../../../../utils/formatDate';
import { Button } from 'flowbite-react';
import { useState } from 'react';
import ModalInternshipDocs from '../../../../../components/ModalInternshipDocument/ModalInternshipDocs';
import { FileIcon } from '../../../../../components/Icons';

const DataLogbook = ({ data, loading }) => {
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
        <h1 className="text-xl font-bold">Data Logbook</h1>
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

        <h1 className="text-sm text-gray-400">Dokumentasi Magang Mandiri</h1>
        <Button color={null} className="border border-gray-400 hover:bg-hoverColor active:bg-primaryColor hover:text-white bg-white col-span-2" onClick={() => handleOpenModal('lecture_docu')}>
          Surat bersedia dosen magang
        </Button>

        <Button color={null} className="border border-gray-400 hover:bg-hoverColor active:bg-primaryColor hover:text-white bg-white col-span-2" onClick={() => handleOpenModal('campus_docu')}>
          Surat magang dari kampus
        </Button>

        <Button color={null} className="border border-gray-400 hover:bg-hoverColor active:bg-primaryColor hover:text-white bg-white col-span-2" onClick={() => handleOpenModal('instance_docu')}>
          Surat magang dari perusahaan
        </Button>
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <p className="text-sm text-gray-500 font-bold">Surat Selesai Magang:</p>
            <button className="w-fit bg-primaryColor text-white p-2 rounded-xl hover:bg-hoverColor duration-150 " type="button" onClick={() => handleOpenModal('intern_complete_file')}>
              <FileIcon />
            </button>
          </div>

          <div className="flex items-baseline gap-2">
            <p className="text-sm text-gray-500 font-bold"> Laporan akhir magang:</p>
            <button className="w-fit bg-primaryColor text-white p-2 rounded-xl hover:bg-hoverColor duration-150 " type="button" onClick={() => handleOpenModal('intern_final_report')}>
              <FileIcon />
            </button>
          </div>

          <div className="flex items-baseline gap-2">
            <p className="text-sm text-gray-500 font-bold">Penilaian dari perusahaan:</p>
            <button className="w-fit bg-primaryColor text-white p-2 rounded-xl hover:bg-hoverColor duration-150 " type="button" onClick={() => handleOpenModal('intern_score_file')}>
              <FileIcon />
            </button>
          </div>
        </div>

        <form className="flex flex-col col-span-2">
          <label htmlFor="lecturer_note" className="text-sm text-gray-400">
            Catatan <span className="text-red-600">*Wajib diisi bila dokumentasi magang tidak valid</span>
          </label>
          <textarea id="lecturer_note" name="lecturer_note" className="rounded-lg bg-gray-200 border-0 text-xs" rows={5} />

          <div className="flex lg:flex-row flex-col gap-2 w-full mt-4">
            <button type="button" className="flex items-center justify-center h-10 lg:w-20 w-full bg-green-500 text-white rounded-md hover:bg-green-600 active:bg-green-700 duration-150 disabled:bg-green-200 disabled:cursor-default">
              {'Validasi'}
            </button>

            <button type="submit" className="flex items-center justify-center h-10 lg:w-24 w-full bg-red-600 text-white rounded-md hover:bg-red-700 active:bg-red-800 duration-150 disabled:bg-red-200 disabled:cursor-default">
              {'Perlu direvisi'}
            </button>
          </div>
        </form>

        {openModal && <ModalInternshipDocs id={data} isOpen={openModal} closeModal={() => setOpenModal(false)} modalType={modalType} />}
      </div>
    </div>
  );
};

DataLogbook.propTypes = {
  data: PropTypes.any,
  loading: PropTypes.bool,
};

export default DataLogbook;
