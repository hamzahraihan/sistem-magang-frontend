import { Modal, Textarea } from 'flowbite-react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import PrimaryButton from '../../../../components/PrimaryButton';
import { useLogbookWeeklyActivityContext, useLogbookWeeklyActivityDispatch } from '../../../../hooks/useLogbookWeeklyActivityContext';

const ModalWeeklyForm = ({ isOpen, closeModal, id }) => {
  const [logDescription, setLogDescription] = useState('');

  const { handleUpdateWeeklyLog, loadingUpdate } = useLogbookWeeklyActivityContext();
  const dispatch = useLogbookWeeklyActivityDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const update = {
      logbook_id: id,
      log_description: logDescription,
      status: 'Belum disetujui',
    };
    dispatch({ type: 'EDIT_WEEK_ACTIVITY', payload: update });
    handleUpdateWeeklyLog(update);
  };
  return (
    <Modal position="center" size="2xl" dismissible show={isOpen} onClose={closeModal}>
      <Modal.Header>
        <div className="text-md">
          <h1 className="text-md">Kegiatan Mingguan</h1>
        </div>
      </Modal.Header>
      <Modal.Body>
        <form className="flex flex-col">
          <Textarea className="rounded-lg h-52" type="text" name="title" id="title" placeholder="Buatkan kesimpulan dari hasil kegiatan harianmu" value={logDescription} onChange={(e) => setLogDescription(e.target.value)} required />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <div className="w-40">
          <PrimaryButton text="Kirim" onClick={handleSubmit} loading={loadingUpdate} />
        </div>
      </Modal.Footer>
    </Modal>
  );
};

ModalWeeklyForm.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  id: PropTypes.number,
};

export default ModalWeeklyForm;
