import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../../components/Icons';
import Table from '../../../components/Table/Table';
import { usePostContext } from '../../../hooks/usePostContext';
import { createColumnHelper } from '@tanstack/react-table';
import { weekDay } from '../../../utils/formatDate';
import { Dropdown } from 'flowbite-react';

const AdminDashboardPost = () => {
  const { loadingPost: loading, post, handleDeletePost, loadingDelete } = usePostContext();
  console.log('🚀 ~ AdminDashboardPost ~ post:', post);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('', {
      id: 'No.',
      cell: (info) => info.row.index + 1,
      header: () => <span>No.</span>,
      size: 20,
    }),
    columnHelper.accessor('title', {
      id: 'Judul',
      cell: (info) => info.getValue(),
      header: () => <span>Judul</span>,
    }),
    columnHelper.accessor('author', {
      id: 'Author',
      cell: (info) => info.getValue(),
      header: () => <span>Author</span>,
    }),
    columnHelper.accessor('updatedAt', {
      id: 'Tanggal Unggah',
      cell: (info) => weekDay(info.getValue()),
      header: () => <span>Tanggal Unggah</span>,
    }),
    columnHelper.accessor('post_id', {
      id: 'Aksi',
      cell: (info) => {
        const id = info.getValue();
        return (
          <div className="flex justify-center w-full ">
            <Dropdown color="teal" label="Aksi" placement="bottom-end">
              <Link className="w-full h-full" to={`/detail-post/${id}`} state={{ post_id: id }}>
                <Dropdown.Item>Detail</Dropdown.Item>
              </Link>
              <button type="button" className="text-sm text-start text-red-700 disabled:text-gray-200 w-full h-full p-2 px-4 hover:bg-red-500 hover:text-white duration-150" disabled={loadingDelete} onClick={() => handleDeletePost(id)}>
                Hapus
              </button>
            </Dropdown>
          </div>
        );
      },
      header: () => <span className="text-center w-full">Aksi</span>,
    }),
  ];
  return (
    <div className="flex flex-col lg:col-span-2 col-span-3">
      <Link to="/" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white mb-2">
        <ArrowIcon />
      </Link>
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex flex-col mb-2">
          <h1 className="text-xl font-bold">Daftar Unggahan oleh Pengguna</h1>
        </div>
        <Table columns={columns} data={post} loading={loading} fileName={'daftar_unggahan_pengguna_website_magang_mandiri'} />
      </div>
    </div>
  );
};

export default AdminDashboardPost;
