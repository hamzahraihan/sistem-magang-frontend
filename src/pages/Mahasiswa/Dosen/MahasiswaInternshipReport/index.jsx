import DataMahasiswa from './DataMahasiswa';
import LogbookMahasiswa from './LogbookMahasiswa';

const MahasiswaInternshipReport = () => {
  return (
    <div className="flex flex-col col-span-3 gap-4">
      <DataMahasiswa />
      <LogbookMahasiswa />
    </div>
  );
};

export default MahasiswaInternshipReport;
