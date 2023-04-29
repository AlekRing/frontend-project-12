import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/esm/Button';
import { useTranslation } from 'react-i18next';
import ChatModal from './ChatModal';
import ChatContext from '../store/context/chatContext';
import { selectchannelId } from '../store/selectors/selectors';
import { setModal } from '../store/reducers/modals';

const RemoveChannelModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { chatActions } = useContext(ChatContext);

  const channelId = useSelector(selectchannelId);
  const toggle = () => dispatch(setModal(''));

  const handleSubmit = async () => {
    chatActions.deleteChannel(channelId, () => {
      toast.success(t('channelDeleted'));
    });
    toggle();
  };

  return (
    <ChatModal title={t('removeChannelModal')}>
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
