import _ from 'lodash';

const DataMahasiswa = () => {
  return (
    <div className="bg-white rounded-xl w-full col-span-3 border border-neutral-200 p-5 ">
      <h1 className="text-xl font-bold">Data Mahasiswa</h1>
      <div className="grid grid-cols-2 gap-4 mt-10">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-gray-300">Nama</h1>
            <p className="text-sm font-bold text-gray-500">{_.upperCase('hamzah raihan')}</p>
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-gray-300">Nomor Whatsapp</h1>
            <p className="text-sm font-bold text-gray-500">089123123</p>
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-gray-300">Email Mahasiswa</h1>
            <p className="text-sm font-bold text-gray-500">hamzah@gmail.com</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-gray-300">NIM</h1>
            <p className="text-sm font-bold text-gray-500">012908301923</p>
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-gray-300">Angkatan</h1>
            <p className="text-sm font-bold text-gray-500">2020</p>
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-gray-300">Jurusan</h1>
            <p className="text-sm font-bold text-gray-500">{_.upperCase('sistem magang')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataMahasiswa;
