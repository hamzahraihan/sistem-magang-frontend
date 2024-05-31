import _ from 'lodash';
import useFetchUserByID from '../../../../features/user/useFetchUserById';
import 'flowbite';
import { Tooltip } from 'flowbite-react';

const DataMahasiswa = () => {
  const { loading, userByID } = useFetchUserByID();

  const fullName = {
    value: loading ? <p className="bg-gray-500 h-5 animate-pulse rounded-md w-full"></p> : _.upperCase(` ${userByID.first_name} ${userByID.last_name}`),
  };
  return (
    <div className="bg-white rounded-xl col-span-3 border border-neutral-200 p-5 ">
      <h1 className="text-xl font-bold">Data Mahasiswa</h1>
      <div className="grid grid-cols-2 gap-4 mt-10">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-gray-300">Nama</h1>
            <p className="text-sm font-bold text-gray-500">{fullName.value}</p>
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-gray-300">Nomor Whatsapp</h1>
            {loading ? <p className="bg-gray-500 h-5 animate-pulse rounded-md w-full"></p> : <p className="text-sm font-bold text-gray-500">{userByID.phone}</p>}
          </div>
          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <h1 className="text-sm font-bold text-gray-300">Email Mahasiswa</h1>
              <Tooltip content={userByID.email}>
                <button type="button" className="flex items-center justify-center bg-gray-500 text-white rounded-full w-4 h-4 font-bold">
                  ?
                </button>
              </Tooltip>
            </div>
            {loading ? <p className="bg-gray-500 h-5 animate-pulse rounded-md w-full"></p> : <p className="text-sm font-bold text-gray-500 truncate">{userByID.email}</p>}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-gray-300">NIM</h1>
            {loading ? <p className="bg-gray-500 h-5 animate-pulse rounded-md w-full"></p> : <p className="text-sm font-bold text-gray-500">{userByID.nim}</p>}
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-gray-300">Angkatan</h1>
            {loading ? <p className="bg-gray-500 h-5 animate-pulse rounded-md w-full"></p> : <p className="text-sm font-bold text-gray-500">{userByID.angkatan}</p>}
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-gray-300">Jurusan</h1>
            {loading ? <p className="bg-gray-500 h-5 animate-pulse rounded-md w-full"></p> : <p className="text-sm font-bold text-gray-500">{_.upperCase(userByID.jurusan)}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataMahasiswa;
