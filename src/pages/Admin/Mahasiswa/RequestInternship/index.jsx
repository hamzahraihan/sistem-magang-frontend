import { Link } from 'react-router-dom';
import { ArrowIcon, DownloadIcon } from '../../../../components/Icons';
import Table from '../../../../components/Table/Table';
import useFetchRequestInternship from '../../../../features/internship/useFetchRequestIntenship';
import { weekDay } from '../../../../utils/formatDate';
import { createColumnHelper } from '@tanstack/react-table';

const AdminRequestInternship = () => {
  const { requestInternship, loading } = useFetchRequestInternship();
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('', {
      id: 'No.',
      cell: (info) => info.row.index + 1,
      header: () => <span className="ps-2">No.</span>,
      size: 20,
    }),
    columnHelper.accessor('instance', {
      id: 'Perusahaan / Instansi',
      cell: (info) => info.getValue(),
      header: 'Perusahaan / Instansi',
    }),
    columnHelper.accessor('type_internship', {
      id: 'Tipe Magang',
      cell: (info) => <span>Magang {info.getValue()}</span>,
      header: 'Tipe Magang',
    }),
    columnHelper.accessor('instance_contact', {
      id: 'Kontak',
      cell: (info) => info.getValue(),
      header: 'Kontak',
    }),
    columnHelper.accessor('internship_letter_file', {
      id: 'Surat Magang',
      cell: (info) => {
        if (info.getValue()) {
          return (
            <Link to={`https://drive.google.com/file/d/${info.getValue()}/view`} target="_blank" rel="noopener noreferrer">
              <div className="w-fit p-2 rounded-md bg-yellow-300 hover:bg-yellow-400 duration-150">
                <DownloadIcon />
              </div>
            </Link>
          );
        }
        return <div className="p-2 rounded-md w-fit bg-gray-300">Menunggu</div>;
      },
      header: 'Surat Magang',
    }),
    columnHelper.accessor('createdAt', {
      id: 'Tanggal',
      cell: (info) => <span>{weekDay(info.getValue())}</span>,
      header: 'Tanggal',
    }),
    columnHelper.accessor('letter_id', {
      id: 'Aksi',
      cell: (info) => (
        <Link to={`detail/${info.getValue()}`} className="flex p-2 bg-gray-200 rounded-lg m-auto text-center w-fit hover:bg-gray-300 active:bg-gray-400 duration-150">
          Lihat detail
        </Link>
      ),
      header: <span className=" w-full text-center">Lihat detail</span>,
    }),
  ];
  return (
    <>
      <div className="flex flex-col lg:col-span-2 col-span-3">
        <Link to="/" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white mb-2">
          <ArrowIcon />
        </Link>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex flex-col mb-2">
            <h1 className="text-xl font-bold">Permohonan Surat Magang</h1>
          </div>
          <Table columns={columns} data={requestInternship} loading={loading} fileName={'daftar_mahasiswa_meminta_surat_permohonan_magang'} />
        </div>
      </div>
    </>
  );
};

export default AdminRequestInternship;
