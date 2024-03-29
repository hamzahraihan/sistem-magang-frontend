import PrimaryButton from '../../components/PrimaryButton';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { useReportInternContext } from '../../hooks/useReportInternContext';

const FormUploadReport = () => {
  const [value, setValue] = useState('');

  const { fileInputRef } = useReportInternContext();

  return (
    <div className="flex flex-col gap-2 text-base">
      <label htmlFor="title">Judul</label>
      <input className="rounded-lg border border-gray-300" type="text" name="title" id="title" placeholder="Masukkan judul laporan akhir " />

      <label htmlFor="title">Keterangan laporan</label>
      <ReactQuill theme="snow" value={value} onChange={setValue} className="pb-10" />

      <label htmlFor="file_url">Upload File</label>
      <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer  focus:outline-none " id="file_url" type="file" multiple ref={fileInputRef} />
      <div className="lg:hidden block pt-4">
        <PrimaryButton type="submit" text={'Kirim laporan'} />
      </div>
    </div>
  );
};

export default FormUploadReport;
