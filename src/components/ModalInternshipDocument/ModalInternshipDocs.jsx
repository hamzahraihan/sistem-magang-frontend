import { Modal } from 'flowbite-react';
import InternshipDocs from './InternshipDocs';
import PropTypes from 'prop-types';

const ModalInternshipDocs = ({ id, isOpen, closeModal, modalType }) => {
  let modalTitle, modalContent;

  switch (modalType) {
    case 'lecture_docu':
      modalTitle = 'Surat bersedia dosen magang';
      modalContent = id.lecture_agreement;
      break;
    case 'campus_docu':
      modalTitle = 'Surat magang dari kampus';
      modalContent = id.campus_approval;
      break;
    case 'instance_docu':
      modalTitle = 'Surat magang dari perusahaan';
      modalContent = id.intern_agreement;
      break;
  }
  return (
    <Modal position="center" size="6xl" dismissible show={isOpen} onClose={closeModal}>
      <Modal.Header>
        <h1 className="text-sm py-2 px-3 bg-hoverColor w-fit rounded-lg text-gray-50">{modalTitle}</h1>
      </Modal.Header>
      <Modal.Body>
        <InternshipDocs docsID={modalContent} />
      </Modal.Body>
    </Modal>
  );
};

ModalInternshipDocs.propTypes = {
  id: PropTypes.object,
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  modalType: PropTypes.string,
};

export default ModalInternshipDocs;
