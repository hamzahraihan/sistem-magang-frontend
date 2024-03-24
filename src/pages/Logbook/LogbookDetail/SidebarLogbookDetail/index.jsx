import LogbookOverallCard from './LogbookOverallCard';

const SidebarLogbookDetail = () => {
  return (
    <div className="sticky flex flex-col lg:col-span-1 col-span-4 top-5 lg:items-start h-[90vh]">
      <div className="flex flex-col items-center w-full gap-5">
        <h1 className="text-xl font-bold text-start w-full">Logbook Minguan</h1>
        <LogbookOverallCard />
      </div>
    </div>
  );
};

export default SidebarLogbookDetail;
