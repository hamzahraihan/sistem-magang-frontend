import CardPost from '../../components/CardPost';
import SidebarHome from './SidebarHome';

const Home = () => {
  return (
    <div className="col-span-3">
      <div className="grid grid-cols-3 gap-5">
        <div className="flex flex-col gap-4 lg:col-span-2 col-span-3 pb-10">
          <p className="font-bold lg:text-2xl text-2xl">Informasi</p>
          <CardPost />
          <CardPost />
          <CardPost />
        </div>
        <SidebarHome />
      </div>
    </div>
  );
};

export default Home;
