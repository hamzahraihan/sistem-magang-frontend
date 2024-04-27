import { useEffect, useRef, useState } from 'react';
import Avvvatars from 'avvvatars-react';
import _ from 'lodash';
import { useUserContext } from '../../hooks/useUserContext';

const ProfileIcon = () => {
  const { userLoggedInData } = useUserContext();
  if (userLoggedInData && userLoggedInData.image == null) {
    return (
      <div className="flex-shrink-0 mt-2 h-10 w-10">
        <Avvvatars size={40} value={userLoggedInData.first_name + userLoggedInData.last_name} displayValue={_.capitalize(userLoggedInData.first_name[0]) + _.capitalize(userLoggedInData.last_name[0])} />
      </div>
    );
  }

  if (userLoggedInData?.image) {
    return <img src={`https://drive.google.com/thumbnail?id=${userLoggedInData?.image}&sz=w1000`} className="mt-2 h-10 w-10 rounded-full flex-shrink-0 object-cover object-center " alt="profile-icon" />;
  }

  return <div className="mt-2 h-10 w-10 bg-slate-500 animate-pulse rounded-full flex-shrink-0 "></div>;
};

const CommentBar = () => {
  const [inputValue, setInputValue] = useState('');
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.current.style.height = '0px';
      const scrollHeight = textAreaRef.current.scrollHeight;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textAreaRef.current.style.height = scrollHeight + 'px';
    }
  }, [textAreaRef, inputValue]);

  return (
    <div className="flex gap-2">
      <ProfileIcon />
      <textarea
        name="post"
        id="post"
        value={inputValue}
        ref={textAreaRef}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full border-0 bg-slate-100 focus:ring-0 focus:outline-none rounded-xl p-5 text-xs ring-0 overflow-hidden resize-none overflow-y-hidden h-auto"
        placeholder="Buat komentar..."
        required
      />
      <button className="flex items-center justify-center rounded-xl h-fit p-5 hover:bg-gray-100 active:bg-gray-200 text-black transition-all font-bold bg-white">Post</button>
    </div>
  );
};

export default CommentBar;
