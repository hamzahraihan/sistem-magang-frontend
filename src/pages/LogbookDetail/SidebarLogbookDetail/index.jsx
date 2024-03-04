const SidebarLogbookDetail = () => {
  return (
    <div className="lg:flex flex-col top-5 lg:items-start h-[90vh] hidden">
      <div className="flex flex-col items-center w-full gap-5">
        <h1 className="text-xl font-bold text-start w-full">Tentang Author</h1>
        <div className="h-28 w-28 bg-slate-500 animate-pulse rounded-full"></div>
        <div className="text-center">
          <p className="text-base font-bold">Hamzah</p>
          <p className="text-xs text-neutral-500 pb-2">Hamzah@gmail.com</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto perferendis </p>
        </div>
      </div>
    </div>
  );
};

export default SidebarLogbookDetail;
