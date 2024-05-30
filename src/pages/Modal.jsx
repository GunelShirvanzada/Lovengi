import React from 'react';
import { Modal as ReactStrapModal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import '../styles/Modal.css';

const CustomModal = ({ isOpen, toggle, title, body, onConfirm }) => {
  const isError = title === 'Xəta';

  return (
    <ReactStrapModal isOpen={isOpen} toggle={toggle} className="custom-modal">
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>
        {body}
      </ModalBody>
      {isError ? null : (
        <ModalFooter>
          <Button color="primary" onClick={onConfirm}>Tamam</Button>{' '}
          <Button color="secondary" onClick={toggle}>İptal</Button>
        </ModalFooter>
      )}
    </ReactStrapModal>
  );
};

export default CustomModal;
