import React from 'react';
import Modal from 'react-bootstrap/Modal';

const ChatModal = ({ title, children }) => (
  <Modal show>
    <Modal.Header>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{children}</Modal.Body>
  </Modal>
);

export default ChatModal;
