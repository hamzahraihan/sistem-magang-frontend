const ProfilePlaceholder = () => {
  return (
    <>
      <h1 className="text-xl font-bold">Profile</h1>
      <div className="flex flex-col gap-2 justify-center items-center m-auto">
        <div className="border border-neutral-400 h-52 w-52  bg-slate-500 animate-pulse rounded-full"></div>
        <p className="font-bold text-base rounded-xl bg-slate-500 py-2 px-4 w-40 animate-pulse"></p>
        <p className="text-neutral-400 w-20 h-2 bg-slate-400 animate-pulse rounded-lg"></p>
      </div>
    </>
  );
};

export default ProfilePlaceholder;
