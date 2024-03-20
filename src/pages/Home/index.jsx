import CardPost from '../../components/CardPost';
import CardPostPlaceholder from '../../components/Placeholder/CardPostPlaceholder';
import { usePostContext } from '../../hooks/usePostContext';
import SidebarHome from './SidebarHome';

const Home = () => {
  const { loadingPost, post, searchParams } = usePostContext();
  console.log('🚀 ~ Home ~ post:', post);

  const searchInput = searchParams.get('search');
  const categoryInput = searchParams.get('category_name');

  const getPost = (searchInput, categoryInput) => {
    if (!searchInput && !categoryInput) {
      return post;
    }

    return post.filter((item) => {
      const titleMatch = searchInput ? item.title.toLowerCase().includes(searchInput.toLowerCase()) : true;
      const categoryMatch = categoryInput ? item.category_name.toLowerCase().includes(categoryInput.toLowerCase()) : true;
      return titleMatch && categoryMatch;
    });
  };

  const filteredPost = getPost(searchInput, categoryInput);
  console.log('🚀 ~ Home ~ filteredPost:', filteredPost);

  return (
    <div className="col-span-3">
      <div className="grid grid-cols-3 gap-5">
        <div className="flex flex-col gap-4 lg:col-span-2 col-span-3 pb-10">
          <h1 className="font-bold lg:text-2xl text-2xl ">Post Terbaru</h1>
          {loadingPost ? (
            <CardPostPlaceholder />
          ) : filteredPost.length === 0 ? (
            <div>Tidak ditemukan</div>
          ) : (
            filteredPost
              .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) // Sorting by date
              .map((item) => <CardPost key={item.post_id} post={item} />)
          )}
        </div>
        <SidebarHome />
      </div>
    </div>
  );
};

export default Home;
