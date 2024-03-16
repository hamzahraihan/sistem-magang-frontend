import { Link } from 'react-router-dom';
import { ArrowIcon } from '../../components/Icons';
import Description from './Description';
import CommentSection from './CommentSection';
import SidebarPost from './SidebarPost';
import { usePostContext } from '../../hooks/usePostContext';
import { useEffect, useState } from 'react';

const DetailPost = () => {
  const [background, setBackground] = useState(null);
  const { loadingPost, postById } = usePostContext();
  console.log('🚀 ~ DetailPost ~ postById:', postById);
  useEffect(() => {
    if (loadingPost) {
      const lowImageBackground = {
        backgroundImage: `url(https://drive.google.com/thumbnail?id=${postById[0]?.image})`,
      };
      setBackground(lowImageBackground);
    }
    const highImageBackground = {
      backgroundImage: `url(https://drive.google.com/thumbnail?id=${postById[0]?.image}&sz=w1000)`,
    };
    setBackground(highImageBackground);
  }, [postById, loadingPost]);

  return (
    <div className="col-span-3">
      <div className="grid grid-cols-3 gap-5">
        <div className="flex flex-col gap-4 lg:col-span-2 col-span-3">
          <Link to="/" className="flex items-center justify-center rotate-180 border border-neutral-300 rounded-full h-10 w-10 hover:bg-neutral-100 transition-all">
            <ArrowIcon />
          </Link>
          {loadingPost ? (
            <div className="bg-slate-400 animate-pulse h-96 rounded-[32px] bg-cover bg-center bg-no-repeat"></div>
          ) : (
            postById[0]?.image && (
              <a href={`https://drive.google.com/uc?export=preview&id=${postById[0]?.image}`} target="_blank">
                <img className="rounded-[32px] bg-cover bg-center bg-no-repeat" src={`https://drive.google.com/thumbnail?id=${postById[0]?.image}&sz=w1000`} alt="post-background" />
              </a>
            )
          )}
          <Description />
          <CommentSection />
        </div>
        <SidebarPost />
      </div>
    </div>
  );
};

export default DetailPost;
