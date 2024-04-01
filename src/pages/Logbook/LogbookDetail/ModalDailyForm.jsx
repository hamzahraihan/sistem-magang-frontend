import { Modal, Textarea } from 'flowbite-react';
import PropTypes from 'prop-types';
import PrimaryButton from '../../../components/PrimaryButton';
import { useLogbookDailyContext, useLogbookDailyDispatch } from '../../../hooks/useLogbookDailyContext';
import { useFormik } from 'formik';
import * as yup from 'yup';

const ModalDailyForm = ({ isOpen, closeModal, logdayID, date }) => {
  const { editLogbook, loadingUpdate } = useLogbookDailyContext();
  const dispatch = useLogbookDailyDispatch();

  const handleCreateLogbook = (values) => {
    const update = {
      logday_id: logdayID,
      log_description: values.log_description,
      isComplete: true,
      date_intern: date,
    };
    dispatch({ type: 'EDIT_DAILYLOG', payload: update });
    editLogbook(update);
  };

  const formik = useFormik({
    initialValues: {
      log_description: '',
    },
    onSubmit: (values) => {
      handleCreateLogbook(values);
    },
    validationSchema: yup.object().shape({
      log_description: yup.string().required('Wajib diisi'),
    }),
  });

  return (
    <Modal position="center" size="2xl" dismissible show={isOpen} onClose={closeModal}>
      <Modal.Header>
        <div className="text-md">
          <h1 className="text-md">Kegiatan harian</h1>
        </div>
      </Modal.Header>
      <Modal.Body>
        <form className="flex flex-col gap-2">
          <Textarea
            className="rounded-lg h-52"
            type="text"
            name="log_description"
            id="title"
            placeholder="Ceritakan pengalaman magang mu hari ini "
            value={formik.values.log_description}
            onChange={(e) => formik.setFieldValue(e.target.name, e.target.value)}
            required
          />
          <p className="text-xs text-red-800">{formik.errors.log_description}</p>
          <div className="w-40">
            <PrimaryButton text="Kirim" onClick={formik.handleSubmit} loading={loadingUpdate} />
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

ModalDailyForm.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  logdayID: PropTypes.number,
  date: PropTypes.any,
};

export default ModalDailyForm;
