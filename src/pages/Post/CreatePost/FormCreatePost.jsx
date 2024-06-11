import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { usePostContext } from '../../../hooks/usePostContext';
import useFetchCategory from '../../../features/category/useFetchCategory';
import _ from 'lodash';
import { Spinner } from '../../../components/Icons';

const FormCreatePost = () => {
  const { postInputData, setPostInputData, imageInputRef } = usePostContext();
  const { category, loading } = useFetchCategory();

  return (
    <div className="flex flex-col gap-2 text-sm">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <label htmlFor="title">Judul</label>
          <input
            className="text-sm rounded-lg border border-gray-300"
            type="text"
            name="title"
            id="title"
            placeholder="Masukkan judul untuk postingan mu "
            required
            onChange={(e) => setPostInputData({ ...postInputData, [e.target.name]: e.target.value })}
          />

          <label htmlFor="category_name">Kategori</label>
          <select
            name="category_name"
            className="text-sm block w-full p-2 text-gray-900 border border-gray-300 rounded-lg "
            value={postInputData.category_name || 'magang'}
            onChange={(e) => setPostInputData({ ...postInputData, [e.target.name]: e.target.value })}
          >
            {category.map((item) => (
              <option value={item.category} key={item.category_id}>
                {_.capitalize(item.category)}
              </option>
            ))}
          </select>

          <label htmlFor="file_url">Upload Gambar</label>
          <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none " id="file_url" type="file" ref={imageInputRef} />

          <label htmlFor="desc">Deskripsi Post</label>
          <ReactQuill theme="snow" id="description" onChange={(content) => setPostInputData({ ...postInputData, description: content })} className="pb-14 bg-white" />
        </>
      )}
    </div>
  );
};

export default FormCreatePost;
