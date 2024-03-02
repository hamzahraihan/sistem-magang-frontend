import { EmailIcon, PasswordIcon } from '../../components/Icons';
import PrimaryButton from '../../components/PrimaryButton';

const FormRegister = () => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex flex-col w-60 text-center gap-2">
        <p className="font-bold">Buat akun</p>
        <p className="text-xs text-gray-400">Silahkan isi data dirimu untuk membuat akun magang mandiri</p>
      </div>

      <form className="flex flex-col gap-3 w-full h-full">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <label htmlFor="firstName">Nama Awal</label>
            <input name="firstName" id="firstName" className="border border-gray-200 rounded-xl p-3 text-xs" type="text" placeholder="Nama awal..." />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName">Nama Akhir</label>
            <input name="lastName" id="lastName" className="border border-gray-200 rounded-xl p-3 text-xs" type="text" placeholder="Nama akhir..." />
          </div>
        </div>
        <div className="flex flex-col relative">
          <label htmlFor="email">Email</label>
          <div className="absolute inset-y-11 start-0 flex items-center ps-3 pointer-events-none">
            <EmailIcon />
          </div>
          <input type="email" name="email" id="email" className="w-full ps-10 border border-gray-200 rounded-xl p-3 text-xs" placeholder="Email..." required />
        </div>
        <div className="flex flex-col relative">
          <label htmlFor="password">Password</label>
          <div className="absolute inset-y-11 start-0 flex items-center ps-3 pointer-events-none">
            <PasswordIcon />
          </div>
          <input type="password" name="password" id="password" className="w-full ps-10 border border-gray-200 rounded-xl p-3 text-xs" placeholder="Password..." required />
        </div>
        <div className="mt-auto">
          <PrimaryButton text={'Register'} />
        </div>
      </form>
    </div>
  );
};

export default FormRegister;
