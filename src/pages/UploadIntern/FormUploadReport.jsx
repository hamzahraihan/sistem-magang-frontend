import PrimaryButton from '../../components/PrimaryButton';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRef, useState } from 'react';
import axios from 'axios';

const FormUploadReport = () => {
  const [value, setValue] = useState('');

  const fileInputRef = useRef(null);

  const handleFileUpload = async () => {
    const files = fileInputRef.current.files;

    if (files.length > 0) {
      const formData = new formData();

      for (const f of files) {
        formData.append('files', f);
      }
      try {
        const { data } = await axios.post(
          'http://localhost:3000/upload',
          {
            formData,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('file uploaded', data.files);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <form className="flex flex-col gap-2 text-base" onSubmit={handleFileUpload}>
      <label htmlFor="title">Judul</label>
      <input className="rounded-lg border border-gray-300" type="text" name="title" id="title" placeholder="Masukkan judul laporan akhir " />

      <label htmlFor="title">Keterangan laporan</label>
      <ReactQuill theme="snow" value={value} onChange={setValue} className="pb-10" />

      <label htmlFor="file_url">Upload File</label>
      <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer  focus:outline-none " id="file_url" type="file" multiple ref={fileInputRef} />
      <div className="lg:hidden block pt-4">
        <PrimaryButton text={'Kirim laporan'} />
      </div>
    </form>
  );
};

export default FormUploadReport;
