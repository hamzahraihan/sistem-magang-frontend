import PrimaryButton from '../../../../components/PrimaryButton';
import PropTypes from 'prop-types';

const SidebarCreateIntenship = ({ loading }) => {
  return (
    <div className="lg:flex lg:col-span-1 col-span-3 flex-col top-5 lg:items-start">
      <div className="flex flex-col w-full gap-5">
        <h1 className="text-xl font-bold">Pendaftaran Magang</h1>
        <p className="text-neutral-500">Semua data yang anda input akan dimasukan kedalam database agar dapat diproses untuk penilaian magang mandiri</p>
        <div className="w-full">
          <PrimaryButton text="Daftar" loading={loading} disable={loading} />
        </div>
      </div>
    </div>
  );
};

SidebarCreateIntenship.propTypes = {
  loading: PropTypes.bool,
};

export default SidebarCreateIntenship;
