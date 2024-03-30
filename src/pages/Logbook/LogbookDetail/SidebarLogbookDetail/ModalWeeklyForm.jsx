import { Modal, Textarea } from 'flowbite-react';
import PropTypes from 'prop-types';
import PrimaryButton from '../../../../components/PrimaryButton';
import { useLogbookWeeklyActivityContext, useLogbookWeeklyActivityDispatch } from '../../../../hooks/useLogbookWeeklyActivityContext';
import { useFormik } from 'formik';
import * as yup from 'yup';

const ModalWeeklyForm = ({ isOpen, closeModal, id }) => {
  const { handleUpdateWeeklyLog, loadingUpdate } = useLogbookWeeklyActivityContext();
  const dispatch = useLogbookWeeklyActivityDispatch();

  const formik = useFormik({
    initialValues: {
      logbook_id: id,
      log_description: '',
      status: 'Belum disetujui',
    },
    onSubmit: (values) => {
      dispatch({ type: 'EDIT_WEEK_ACTIVITY', payload: values });
      handleUpdateWeeklyLog(values);
    },
    validationSchema: yup.object().shape({
      log_description: yup.string().required('Logbook wajib diisi'),
    }),
  });

  const handleInputForm = (event) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
  };

  return (
    <Modal position="center" size="2xl" dismissible show={isOpen} onClose={closeModal}>
      <Modal.Header>
        <div className="text-md">
          <h1 className="text-md">Kegiatan Mingguan</h1>
        </div>
      </Modal.Header>
      <Modal.Body>
        <form className="flex flex-col gap-4">
          <Textarea className="rounded-lg h-52" type="text" name="log_description" id="log_description" placeholder="Buatkan kesimpulan dari hasil kegiatan harianmu" onChange={handleInputForm} required />
          <p className="text-xs text-red-800">{formik.errors.log_description}</p>
          <div className="w-40">
            <PrimaryButton text="Kirim" onClick={formik.handleSubmit} loading={loadingUpdate} />
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

ModalWeeklyForm.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  id: PropTypes.number,
};

export default ModalWeeklyForm;
