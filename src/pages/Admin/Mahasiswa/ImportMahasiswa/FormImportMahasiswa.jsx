import { Modal } from 'flowbite-react';
import PropTypes from 'prop-types';
import { useUserContext } from '../../../../hooks/useUserContext';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Spinner } from '../../../../components/Icons';

const FormImportMahasiswa = ({ isOpen, closeModal }) => {
  const { handleSubmitImportMahasiswa, excelInputRef, loadingImport } = useUserContext();

  const validFileExt = { files: ['doc', 'docx', 'pdf', 'jpg', 'xlsx'] };
  const isValidFileType = (fileName) => {
    return fileName && validFileExt['files'].indexOf(fileName.split('.').pop()) > -1;
  };

  function getAllowedExt() {
    return validFileExt['files'].map((e) => `.${e}`).toString();
  }
  const allowedExt = getAllowedExt();

  const MAX_FILE_SIZE = 10485760; //max 10 mb file size

  const formik = useFormik({
    initialValues: {
      excel: '',
    },
    onSubmit: () => {
      handleSubmitImportMahasiswa();
    },
    validationSchema: yup.object().shape({
      excel: yup
        .mixed()
        .required('Wajib diisi')
        .test('is-valid-type', `Format file salah, file harus berformat .${allowedExt}`, (value) => {
          return isValidFileType(value?.name?.toLowerCase());
        })
        .test('is-valid-size', 'Max allowed size is 10 mb', (value) => {
          return value?.size <= MAX_FILE_SIZE;
        }),
    }),
  });

  return (
    <Modal position="center" size="6xl" dismissible show={isOpen} onClose={closeModal}>
      <Modal.Header>
        <h1 className="text-sm py-2 px-3 bg-hoverColor w-fit rounded-lg text-gray-50">Import data dari excel</h1>
      </Modal.Header>
      <Modal.Body>
        <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer  focus:outline-none "
            id="excel"
            type="file"
            name="excel"
            accept={allowedExt}
            onChange={(e) => formik.setFieldValue(e.target.name, e.currentTarget.files[0])}
            ref={excelInputRef}
          />
          <p className="text-xs text-red-600">{formik.errors.excel}</p>
          <button type="submit" className="p-2 bg-primaryColor rounded-md w-fit text-white disabled:opacity-25" disabled={loadingImport}>
            {loadingImport ? <Spinner /> : 'Import'}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

FormImportMahasiswa.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default FormImportMahasiswa;
