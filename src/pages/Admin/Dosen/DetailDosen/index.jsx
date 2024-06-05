import DataDosen from './DataDosen';
import MahasiswaBimbingan from './MahasiswaBimbingan';

const DetailDosen = () => {
  return (
    <div className="flex flex-col gap-4">
      <DataDosen />
      <MahasiswaBimbingan />
    </div>
  );
};

export default DetailDosen;
