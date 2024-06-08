import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../../../components/Icons';
import Table from '../../../../components/Table/Table';

const AdminPostCategory = () => {
  return (
    <div className="flex flex-col lg:col-span-2 col-span-3">
      <Link to="/" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all bg-white mb-2">
        <ArrowIcon />
      </Link>
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex flex-col mb-2">
          <h1 className="text-xl font-bold">Daftar Unggahan oleh Pengguna</h1>
        </div>
        {/* <Table columns={columns} data={post} loading={loading} fileName={'daftar_unggahan_pengguna_website_magang_mandiri'} /> */}
      </div>
    </div>
  );
};

export default AdminPostCategory;
