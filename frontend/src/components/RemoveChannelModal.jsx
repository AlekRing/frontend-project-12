import React, { useContext } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { useTranslation } from 'react-i18next';
import ChatModal from '../containers/ChatModal';
import ChatContext from '../store/context/chatContext';

const RemoveChannelModal = ({ toggle, isOpen }) => {
  const { t } = useTranslation();
  const { socket, changingChannelId } = useContext(ChatContext);

  const handleSubmit = async () => {
    socket.emit('removeChannel', { id: changingChannelId });
    toggle();
  };

  return (
    <ChatModal isOpen={isOpen} title={t('removeChannelModal')}>
      <Button variant="danger" type="button" onClick={handleSubmit} className="d-inline me-3">{t('removeChannel')}</Button>
      <Button variant="secondary" type="button" onClick={toggle} className="d-inline">{t('cancel')}</Button>
    </ChatModal>
  );
};

export default RemoveChannelModal;