import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/esm/Button';
import { useTranslation } from 'react-i18next';
import ChatModal from './ChatModal';
import ChatContext from '../store/context/chatContext';
import { toggleRemoveModal } from '../store/reducers/modals';
import { selectChangingChannelId } from '../store/selectors/selectors';

const RemoveChannelModal = ({ isOpen }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { chatActions } = useContext(ChatContext);

  const changingChannelId = useSelector(selectChangingChannelId);
  const toggle = () => dispatch(toggleRemoveModal());

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
