import InternshipSideCard from './InternshipSideCard';

const SidebarDetailInternship = () => {
  return (
    <div className="lg:flex lg:col-span-1 col-span-3 flex-col top-5 lg:items-start">
      <div className="flex flex-col items-center w-full gap-5">
        <h1 className="text-xl font-bold text-start w-full">Kegiatanku</h1>
        <InternshipSideCard />
      </div>
    </div>
  );
};

export default SidebarDetailInternship;
