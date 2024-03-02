import CardPost from './CardPost';

const Home = () => {
  return (
    <div className="flex flex-col gap-10 lg:col-span-2 md:col-span-2 col-span-2 ">
      <p className="font-bold lg:text-2xl text-2xl">Informasi</p>
      <CardPost />
      <CardPost />
      <CardPost />
    </div>
  );
};

export default Home;
