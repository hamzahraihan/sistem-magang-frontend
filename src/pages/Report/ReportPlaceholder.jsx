const ReportPlaceholder = () => {
  return (
    <div className="group flex flex-col gap-2 border border-gray-300 p-3 rounded-xl w-full mb-5">
      <p className="bg-gray-500 h-4 w-full animate-pulse rounded-xl"></p>
      <div className="flex gap-2 items-center">
        <div>
          <p className="bg-gray-500 rounded-xl animate-pulse h-2 w-44 mb-1"></p>
          <p className="text-gray-500 bg-gray-500 h-2 w-20 animate-pulse rounded-xl"></p>
        </div>
        <p className="bg-gray-200 w-fit rounded-xl p-2 ms-auto flex-shrink-0 h-fit animate-pulse"></p>
      </div>
    </div>
  );
};

export const ReportPlaceholderList = () => {
  return Array.from({ length: 2 }).map((_, index) => <ReportPlaceholder key={index} />);
};

export default ReportPlaceholder;
