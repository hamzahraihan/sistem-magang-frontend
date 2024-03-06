import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useState } from 'react';

const FormCreatePost = () => {
  const [value, setValue] = useState('');
  return (
    <div className="flex flex-col gap-2 text-base">
      <label htmlFor="title">Judul</label>
      <input className="rounded-lg border border-gray-300" type="text" name="title" id="title" placeholder="Masukkan judul untuk postingan mu " required />

      <label htmlFor="desc">Deskripsi Post</label>
      <ReactQuill theme="snow" value={value} onChange={setValue} className="pb-10" />

      <label htmlFor="category_name">Kategori</label>
      <select id="large" name="category_name" className="text-base block w-full p-4 text-gray-900 border border-gray-300 rounded-lg" onChange={(e) => setSearch({ ...search, [e.target.name]: e.target.value })}>
        <option defaultValue={true}>Pilih Kategori</option>
        <option value="magang">Magang</option>
        <option value="diskusi">Diskusi</option>
        <option value="kendala">Kendala</option>
        <option value="bertanya">Bertanya</option>
      </select>

      <label htmlFor="file_url">Upload Gambar</label>
      <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer  focus:outline-none " id="file_url" type="file" />
    </div>
  );
};

export default FormCreatePost;
