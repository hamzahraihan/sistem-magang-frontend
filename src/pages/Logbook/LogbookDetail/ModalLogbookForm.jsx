import { Modal, Textarea } from 'flowbite-react';
import PropTypes from 'prop-types';
import PrimaryButton from '../../../components/PrimaryButton';
import { useState } from 'react';
import { useLogbookDailyContext, useLogbookDailyDispatch } from '../../../hooks/useLogbookDailyContext';

const ModalLogbookForm = ({ isOpen, closeModal, logdayID, date }) => {
  const [logDescription, setLogDescription] = useState('');
  const { editLogbook, loadingUpdate } = useLogbookDailyContext();
  const dispatch = useLogbookDailyDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const update = {
      logday_id: logdayID,
      log_description: logDescription,
      isComplete: true,
      date_intern: date,
    };
    dispatch({ type: 'EDIT_DAILYLOG', payload: update });
    editLogbook(update);
  };
  return (
    <Modal position="center" size="2xl" dismissible show={isOpen} onClose={closeModal}>
      <Modal.Header>
        <div className="text-md">
          <h1 className="text-md">Kegiatan harian</h1>
        </div>
      </Modal.Header>
      <Modal.Body>
        <form className="flex flex-col">
          <Textarea className="rounded-lg h-52" type="text" name="title" id="title" placeholder="Ceritakan pengalaman magang mu hari ini " value={logDescription} onChange={(e) => setLogDescription(e.target.value)} required />
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

ModalLogbookForm.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  logdayID: PropTypes.number,
  date: PropTypes.any,
};

export default ModalLogbookForm;
