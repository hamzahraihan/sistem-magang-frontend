import { useParams } from 'react-router-dom';
import { EmailIcon, PasswordIcon } from '../../components/Icons';
import PrimaryButton from '../../components/PrimaryButton';
import { useUserContext } from '../../hooks/useUserContext';
import { useState } from 'react';

const FormLogin = () => {
  const [userInput, setUserInput] = useState({ email: '', password: '' });
  console.log('🚀 ~ FormLogin ~ userInput:', userInput);
  const { role, handleLogin } = useUserContext();

  const { roleUrl } = useParams();

  const handleSubmitLoginData = (e) => {
    e.preventDefault();
    handleLogin(userInput.email, userInput.password);
  };

  return (
    <div className="flex flex-col h-full gap-4 items-center">
      <div className="flex flex-col w-60 text-center gap-2">
        <p className="font-bold">Masuk dengan akun {role.roleChoice ? role.roleChoice : roleUrl}</p>
        <p className="text-xs text-gray-400">Silahkan isi data dirimu untuk membuat akun magang mandiri</p>
      </div>

      <form className="flex flex-col gap-3 w-full h-full" onSubmit={handleSubmitLoginData}>
        <div className="flex flex-col relative">
          <label htmlFor="email">Email</label>
          <div className="absolute inset-y-11 start-0 flex items-center ps-3 pointer-events-none">
            <EmailIcon />
          </div>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full ps-10 border border-gray-200 rounded-xl p-3 text-xs"
            placeholder="Email..."
            value={userInput.email}
            onChange={(e) => setUserInput({ ...userInput, [e.target.name]: e.target.value })}
            required
          />
        </div>
        <div className="flex flex-col relative">
          <label htmlFor="password">Password</label>
          <div className="absolute inset-y-11 start-0 flex items-center ps-3 pointer-events-none">
            <PasswordIcon />
          </div>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full ps-10 border border-gray-200 rounded-xl p-3 text-xs"
            placeholder="Password..."
            value={userInput.password}
            onChange={(e) => setUserInput({ ...userInput, [e.target.name]: e.target.value })}
            required
          />
        </div>
        <div className="mt-auto">
          <PrimaryButton text={'Login'} />
        </div>
      </form>
    </div>
  );
};

export default FormLogin;
