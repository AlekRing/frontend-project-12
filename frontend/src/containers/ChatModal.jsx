import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import ModalWindow from '../components/ModalWindow';

const ChatModal = ({ isOpen, handleSubmit }) => (
  <ModalWindow isOpen={isOpen}>
    <p>Add new channel.</p>
    <Button variant="primary" type="submit" onClick={handleSubmit}>
      Add channel
    </Button>
  </ModalWindow>
);

export default ChatModal;
