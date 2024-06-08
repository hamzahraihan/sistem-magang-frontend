import { createColumnHelper } from '@tanstack/react-table';
import Table from '../../../../components/Table/Table';
import useFetchCategory from '../../../../features/category/useFetchCategory';

const AdminPostCategory = () => {
  const { category, loading } = useFetchCategory();
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('', {
      id: 'No.',
      cell: (info) => info.row.index + 1,
      header: 'No.',
      size: 20,
    }),
    columnHelper.accessor('category', {
      id: 'Kategori Unggahan',
      cell: (info) => info.getValue(),
      header: () => <span>Kategori Unggahan</span>,
      size: 200,
    }),
    columnHelper.accessor('category_id', {
      id: 'Aksi',
      cell: (info) => {
        const id = info.getValue();
        return (
          <button type="button" className=" p-3 bg-red-600 text-white rounded-xl" onClick={() => {}}>
            Hapus
          </button>
        );
      },
      header: () => <span>Aksi</span>,
      size: 20,
    }),
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 h-fit">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-bold">Kategori Unggahan</h1>
        <button className="border border-gray-300 p-2 rounded-xl hover:bg-gray-100 active:bg-gray-200 duration-150">Tambah</button>
      </div>
      <Table columns={columns} data={category} loading={loading} fileName={'daftar_kategori_unggahan'} />
    </div>
  );
};

export default AdminPostCategory;
