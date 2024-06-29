import PropTypes from 'prop-types';
import PrimaryButton from '../../../../../components/PrimaryButton';

const SidebarRequestInternship = ({ loading }) => {
  return (
    <div className="lg:flex lg:col-span-1 col-span-3 flex-col top-5 lg:items-start">
      <div className="flex flex-col w-full gap-5">
        <h1 className="text-xl font-bold">Surat Permohonan Magang</h1>
        <p className="text-neutral-500">Semua data yang anda input akan dimasukan kedalam database agar dapat diproses untuk pembuatan surat permohonan magang mandiri</p>
        <div className="w-full">
          <PrimaryButton text="Kirim" loading={loading} disable={loading} />
        </div>
      </div>
    </div>
  );
};

SidebarRequestInternship.propTypes = {
  loading: PropTypes.bool,
};

export default SidebarRequestInternship;
