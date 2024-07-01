import { Link } from 'react-router-dom';
import { ArrowIcon, FileIcon, Spinner } from '../../../../../components/Icons';
import { useState } from 'react';
import ModalReport from '../../../../Report/Detail/ModalReport';
import { useFormik } from 'formik';
import * as yup from 'yup';
import _ from 'lodash';
import { formatDate, weekDay } from '../../../../../utils/formatDate';
import useFetchRequestInternshipById from '../../../../../features/internship/useFetchRequestInternshipById';
import { useInternshipContext } from '../../../../../hooks/useInternshipContext';

const DetailRequestInternship = () => {
  const { requestInternship, loading } = useFetchRequestInternshipById();
  const { handleSendLetterInternship, letterOfInternshipFileRef, loadingLetter } = useInternshipContext();

  const validFileExt = { files: ['pdf'] };
  const isValidFileType = (fileName) => {
    return fileName && validFileExt['files'].indexOf(fileName.split('.').pop()) > -1;
  };

  function getAllowedExt() {
    return validFileExt['files'].map((e) => `.${e}`).toString();
  }
  const allowedExt = getAllowedExt();

  const MAX_FILE_SIZE = 10485760; //max 10 mb file size

  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const handleModal = (type) => {
    setOpenModal(true);
    setModalType(type);
  };

  const formik = useFormik({
    initialValues: {
      internship_letter_file: '',
    },
    onSubmit: (values) => {
      handleSendLetterInternship(values);
    },
    validationSchema: yup.object().shape({
      internship_letter_file: yup
        .mixed()
        .required('Wajib diisi')
        .test('is-valid-type', `Format file salah, file harus berformat .${allowedExt}`, (value) => {
          return isValidFileType(value?.name?.toLowerCase());
        })
        .test('is-valid-size', 'Max allowed size is 10 mb', (value) => {
          return value?.size <= MAX_FILE_SIZE;
        }),
    }),
  });

  let statusColor;
  let statusText;
  switch (requestInternship.status) {
    case 'Menunggu':
      statusColor = 'bg-gray-300 text-black';
      statusText = 'Menunggu';
      break;
    case 'Terkirim':
      statusColor = 'bg-green-500 text-white';
      statusText = 'Terkirim';
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
            <h1 className="text-xl font-bold">Detail Permohonan Surat Magang</h1>
            <div className={`flex items-center justify-center rounded-xl ${statusColor} w-28 h-10 font-bold`}>{statusText}</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-sm text-gray-400">Data Diri Mahasiswa</h1>
              <div className="flex flex-col">
                <h1 className="text-sm font-bold text-gray-300">Nama</h1>
                {loading ? (
                  <div className="bg-gray-400 rounded-md h-5 w-72 animate-pulse"></div>
                ) : (
                  <div className="text-sm font-bold text-gray-500">{requestInternship.Mahasiswa ? _.upperCase(`${requestInternship.Mahasiswa?.first_name || ''} ${requestInternship.Mahasiswa?.last_name || ''}`) : 'N/A'}</div>
                )}
              </div>
              <div className="flex flex-col">
                <h1 className="text-sm font-bold text-gray-300">NIM</h1>
                <p className="text-sm font-bold text-gray-500">{requestInternship.Mahasiswa?.nim}</p>
              </div>
              <div className="flex flex-col">
                <h1 className="text-sm font-bold text-gray-300">Angkatan</h1>
                <p className="text-sm font-bold text-gray-500">{requestInternship.Mahasiswa?.angkatan}</p>
              </div>
              <div className="flex flex-col">
                <h1 className="text-sm font-bold text-gray-300">Alamat Lengkap</h1>
                <p className="text-sm font-bold text-gray-500">{requestInternship.mahasiswa_address}</p>
              </div>
              <div className="flex flex-col">
                <h1 className="text-sm font-bold text-gray-300">Tempat, Tanggal Lahir</h1>
                <p className="text-sm font-bold text-gray-500">{`${requestInternship.placeofbirth}, ${formatDate(requestInternship.dateofbirth)}`}</p>
              </div>
              <div className="flex flex-col">
                <h1 className="text-sm font-bold text-gray-300">Agama</h1>
                <p className="text-sm font-bold text-gray-500">{requestInternship.religion}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-sm text-gray-400">Pendaftaran Perusahaan</h1>
              <div className="flex flex-col">
                <h1 className="text-sm font-bold text-gray-300">Nama Perusahaan</h1>
                <p className="text-sm font-bold text-gray-500">{requestInternship.instance}</p>
              </div>
              <div className="flex flex-col">
                <h1 className="text-sm font-bold text-gray-300">Tipe Magang</h1>
                <p className="text-sm font-bold text-gray-500">{_.capitalize(requestInternship.type_internship)}</p>
              </div>
              <div className="flex flex-col">
                <h1 className="text-sm font-bold text-gray-300">Penerima / Tujuan Surat</h1>
                <p className="text-sm font-bold text-gray-500">{requestInternship.letter_receiver}</p>
              </div>
              <div className="flex flex-col">
                <h1 className="text-sm font-bold text-gray-300">Alamat Perusahaan</h1>
                <p className="text-sm font-bold text-gray-500">{requestInternship.instance_address}</p>
              </div>
              <div className="flex flex-col">
                <h1 className="text-sm font-bold text-gray-300">Kontak Perusahaan</h1>
                <p className="text-sm font-bold text-gray-500">{requestInternship.instance_contact}</p>
              </div>
              <div className="flex flex-col">
                <h1 className="text-sm font-bold text-gray-300">Deskripsi Perusahaan</h1>
                <p className="text-sm font-bold text-gray-500">{requestInternship.description}</p>
              </div>
              <div className="flex flex-col">
                <h1 className="text-sm font-bold text-gray-300">Jenis Badan Usaha</h1>
                <p className="text-sm font-bold text-gray-500">{requestInternship.typeofbusiness}</p>
              </div>
              <div className="flex flex-col">
                <h1 className="text-sm font-bold text-gray-300">Mulai Magang</h1>
                <p className="text-sm font-bold text-gray-500">{weekDay(requestInternship.start_intern)}</p>
              </div>
              <div className="flex flex-col">
                <h1 className="text-sm font-bold text-gray-300">Akhir Magang</h1>
                <p className="text-sm font-bold text-gray-500">{weekDay(requestInternship.end_intern)}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline gap-2">
              <p className="text-sm text-gray-500 font-bold">Surat bersedia dosen membimbing:</p>
              <button className="w-fit bg-primaryColor text-white p-2 rounded-xl hover:bg-hoverColor duration-150 " type="button" onClick={() => handleModal('lecture_agreement')}>
                <FileIcon />
              </button>
            </div>

            {openModal && <ModalReport report={requestInternship} isOpen={openModal} closeModal={() => setOpenModal(false)} modalType={modalType} />}

            <form className="flex flex-col" onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-2 w-full mt-4">
                <label className="font-bold text-sm" htmlFor="internship_letter_file">
                  Kirim Surat Permohonan Magang
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer  focus:outline-none "
                  id="internship_letter_file"
                  type="file"
                  name="internship_letter_file"
                  accept={allowedExt}
                  onChange={(e) => formik.setFieldValue(e.target.name, e.currentTarget.files[0])}
                  ref={letterOfInternshipFileRef}
                />
                <p className="text-xs text-red-800">{formik.errors.internship_letter_file}</p>
                <button
                  type="submit"
                  className="flex items-center justify-center h-10 lg:w-24 w-full bg-red-600 text-white rounded-md hover:bg-red-700 active:bg-red-800 duration-150 disabled:bg-red-200 disabled:cursor-default"
                  disabled={loadingLetter}
                >
                  {loadingLetter ? <Spinner /> : 'Kirim'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailRequestInternship;
