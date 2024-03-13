import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { usePostContext } from '../../../hooks/usePostContext';

const FormCreatePost = () => {
  const { postInputData, setPostInputData, imageInputRef } = usePostContext();
  console.log('🚀 ~ FormCreatePost ~ postInputData:', postInputData);

  return (
    <div className="flex flex-col gap-2 text-base">
      <label htmlFor="title">Judul</label>
      <input
        className="rounded-lg border border-gray-300"
        type="text"
        name="title"
        id="title"
        placeholder="Masukkan judul untuk postingan mu "
        required
        value={postInputData.title}
        onChange={(e) => setPostInputData({ ...postInputData, [e.target.name]: e.target.value })}
      />

      <label htmlFor="desc">Deskripsi Post</label>
      <ReactQuill theme="snow" id="description" value={postInputData.description} onChange={(content) => setPostInputData({ ...postInputData, description: content })} className="pb-10" />

      <label htmlFor="category_name">Kategori</label>
      <select
        id="large"
        name="category_name"
        className="text-base block w-full p-4 text-gray-900 border border-gray-300 rounded-lg "
        value={postInputData.category_name}
        onChange={(e) => setPostInputData({ ...postInputData, [e.target.name]: e.target.value })}
      >
        <option defaultValue="magang">Pilih Kategori</option>
        <option value="magang">Magang</option>
        <option value="diskusi">Diskusi</option>
        <option value="kendala">Kendala</option>
        <option value="bertanya">Bertanya</option>
      </select>

      <label htmlFor="file_url">Upload Gambar</label>
      <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer  focus:outline-none " id="file_url" type="file" ref={imageInputRef} />
    </div>
  );
};

export default FormCreatePost;
