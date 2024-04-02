import ReportSVG from '../../assets/svg/report-document-bro.svg';

const ReportNotFound = () => {
  return (
    <>
      <div className="h-80">
        <img className="mx-auto h-96 object-fill" height="300" width="300" src={ReportSVG} alt="report-not-found" />
      </div>
      <div className="mx-auto text-center w-80">
        <p className="text-xl font-bold">Belum buat laporan</p>
        <p className="text-sm ">Silahkan buat laporan jika magang sudah selesai</p>
      </div>
    </>
  );
};

export default ReportNotFound;
