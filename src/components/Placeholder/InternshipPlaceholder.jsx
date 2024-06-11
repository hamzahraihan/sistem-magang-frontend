const InternshipPlaceholder = () => {
  const items = Array.from({ length: 5 });
  return (
    <div className="flex flex-col gap-2 min-w-full">
      {items.map((_, index) => (
        <div key={index} className="flex border items-center border-gray-200 rounded-xl p-4 transition-all bg-white">
          <div className="flex flex-1 gap-1 flex-col">
            <p className="bg-gray-600 animate-pulse h-3 w-40 rounded-lg"></p>
            <p className="bg-gray-600 animate-pulse h-3 w-4/5 rounded-lg"></p>
            <div className="flex gap-2">
              <p className="bg-gray-600 animate-pulse h-3 w-full rounded-lg"></p>
              <p className="bg-gray-600 animate-pulse h-3 w-full rounded-lg"></p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InternshipPlaceholder;
