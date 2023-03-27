import React, { useContext } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { useTranslation } from 'react-i18next';
import ChatModal from '../containers/ChatModal';
import ChannelActionsContext from '../store/context/channelActionsContext';
import ChatContext from '../store/context/chatContext';

const RemoveChannelModal = ({ toggle, isOpen }) => {
  const { t } = useTranslation();
  const { changingChannelId } = useContext(ChannelActionsContext);
  const { chatActions } = useContext(ChatContext);

  const handleSubmit = async () => {
    chatActions.deleteChannel(changingChannelId);
    toggle();
  };

  return (
    <ChatModal isOpen={isOpen} title={t('removeChannelModal')}>
      <Button variant="danger" type="button" onClick={handleSubmit} className="d-inline me-3">
        {t('removeChannel')}
      </Button>
      <Button variant="secondary" type="button" onClick={toggle} className="d-inline">
        {t('cancel')}
      </Button>
    </ChatModal>
  );
};

export default RemoveChannelModal;
