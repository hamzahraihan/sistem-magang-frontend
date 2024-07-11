import { Link } from 'react-router-dom';
import { ArrowIcon, DownloadIcon } from '../../../components/Icons';
import SidebarInternshipRequirements from './SidebarInternshipRequirements';
import FormsVector from '../../../assets/svg/forms.svg';
import DownloadVector from '../../../assets/svg/filesdownload.svg';
// import InternshipVector from '../../../assets/svg/Internship-bro.svg';
import RequirementCard from './RequirementCard';
import Table from '../../../components/Table/Table';
import { createColumnHelper } from '@tanstack/react-table';
import { weekDay } from '../../../utils/formatDate';
import useFetchRequestInternshipByMahasiswa from '../../../features/internship/useFetchRequestInternshipByMahasiswa';

const RequirementMenu = () => {
  const { requestInternship, loading } = useFetchRequestInternshipByMahasiswa();
  console.log('🚀 ~ RequirementMenu ~ requestInternship:', requestInternship);

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
    columnHelper.accessor((row) => [row.letter_id, row.status, row.internship_id], {
      id: 'Status',
      cell: (info) => {
        const [letter_id, status, internship_id] = info.getValue();
        if (status == 'Terkirim') {
          return (
            <Link to={`/kegiatan-magang/daftar-magang/${letter_id}`}>
              <div className="w-fit p-2 rounded-md bg-primaryColor hover:bg-hoverColor duration-150 text-white text-center">Daftar magang</div>
            </Link>
          );
        } else if (status == 'Terdaftar') {
          return (
            <Link to={`/kegiatan-magang/detail/${internship_id}`}>
              <div className="p-2 rounded-md w-fit bg-green-400 hover:bg-green-500 text-white duration-150 text-center">Sudah mendaftar</div>
            </Link>
          );
        }
        return <div className="p-2 rounded-md w-fit bg-gray-300">Belum bisa mendaftar</div>;
      },
      header: 'Status',
    }),
    columnHelper.accessor('createdAt', {
      id: 'Tanggal',
      cell: (info) => <span>{weekDay(info.getValue())}</span>,
      header: 'Tanggal',
    }),
  ];

  return (
    <div className="grid grid-cols-3 gap-5 min-w-full ">
      <div className="flex flex-col gap-4 lg:col-span-2 col-span-3">
        <Link to="/" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white">
          <ArrowIcon />
        </Link>
        <h1 className="font-bold text-xl">Berkas Magang</h1>
        <div className="grid grid-cols-2 gap-2">
          <RequirementCard vector={FormsVector} link="/berkas-magang/permohonan-magang" title="Form Permohonan Magang" />
          {/* <RequirementCard vector={InternshipVector} link="https://drive.google.com/drive/u/1/folders/13_CQ53O0eIKVCQsuSVlHAqvMFFQD7m6-" title="Perpanjang Magang" /> */}
          <RequirementCard vector={DownloadVector} link="https://drive.google.com/drive/u/1/folders/13_CQ53O0eIKVCQsuSVlHAqvMFFQD7m6-" title="Unduh Berkas Magang" />
        </div>
        <h1 className="font-bold text-xl">Surat Permohonan Magang</h1>
        <div className="overflow-auto">
          <Table columns={columns} data={requestInternship} loading={loading} fileName="laporan_surat_permohonan_magang" />
        </div>
      </div>
      <SidebarInternshipRequirements />
    </div>
  );
};

export default RequirementMenu;
