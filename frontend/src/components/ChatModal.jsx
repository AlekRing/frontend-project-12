import React from 'react';
import Modal from 'react-bootstrap/Modal';

const ChatModal = ({ isOpen, title, children }) => (
  <Modal show={isOpen}>
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal.Dialog>
  </Modal>
);

export default ChatModal;
