import { Modal } from 'flowbite-react';
import PropTypes from 'prop-types';

const ModalReport = ({ report, isOpen, closeModal, modalType }) => {
  let modalTitle, modalContent;
  switch (modalType) {
    case 'intern_complete_file':
      modalTitle = 'Surat selesai magang';
      modalContent = report.intern_complete_file;
      break;
    case 'intern_final_report':
      modalTitle = 'Laporan akhir magang';
      modalContent = report.intern_final_report;
      break;
    case 'intern_score_file':
      modalTitle = 'Penilaian dari perusahaan';
      modalContent = report.intern_score_file;
      break;
  }

  return (
    <Modal position="center" size="6xl" dismissible show={isOpen} onClose={closeModal}>
      <Modal.Header>
        <h1 className="text-sm py-2 px-3 bg-hoverColor w-fit rounded-lg text-gray-50">{modalTitle}</h1>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-1">
          <iframe className="w-full h-[500px]" src={`https://drive.google.com/file/d/${modalContent}/preview`} title="docs"></iframe>
        </div>
      </Modal.Body>
    </Modal>
  );
};

ModalReport.propTypes = {
  report: PropTypes.object,
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  modalType: PropTypes.string,
};

export default ModalReport;
