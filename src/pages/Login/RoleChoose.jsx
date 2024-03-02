import SelectRole from '../../components/SelectRole';

const RoleChoose = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-between">
      <div className="flex flex-col w-60 text-center gap-2">
        <p className="font-bold">Siapakah kamu?</p>
        <p className="text-xs text-gray-400">Silahkan pilih role kamu untuk masuk ke dalam sistem magang</p>
      </div>

      <SelectRole role={'Mahasiswa'} />
      <SelectRole role={'Dosen'} />
      <SelectRole role={'Admin'} />
    </div>
  );
};

export default RoleChoose;
