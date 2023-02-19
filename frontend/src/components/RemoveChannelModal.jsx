import React, { useContext } from 'react';
import Button from 'react-bootstrap/esm/Button';
import ChatModal from '../containers/ChatModal';
import ChatContext from '../store/context/chatContext';

const RemoveChannelModal = ({ toggle, isOpen }) => {
  const { socket } = useContext(ChatContext);

  const handleSubmit = async () => {
    socket.emit('removeChannel');
    toggle();
  };

  return (
    <ChatModal isOpen={isOpen}>
      <h4>Remove modal?</h4>
      <Button variant="danger" type="button" onClick={handleSubmit} className="d-inline">Remove</Button>
      <Button variant="secondary" type="button" onClick={toggle} className="d-inline">Cancel</Button>
    </ChatModal>
  );
};

export default RemoveChannelModal;
