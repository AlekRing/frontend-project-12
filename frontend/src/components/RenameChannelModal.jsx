import React, { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/esm/Button';
import { useTranslation } from 'react-i18next';
import CommonForm from './CommonForm';
import ChatModal from '../containers/ChatModal';
import { channelsNamesSelector } from '../store/selectors/chat';
import ChannelActionsContext from '../store/context/channelActionsContext';
import SocketContext from '../store/context/socketContext';

const initialValues = { channelName: '' };
const initialValuesInputsProps = { channelName: { type: 'text', placeholder: 'chatNamePlaceholder' } };

const channelNameSchema = Yup.object().shape({
  channelName: Yup.string()
    .min(2, 'Too Short!')
    .max(25, 'Too Long!')
    .required('Required'),
});

const RenameChannelModal = ({ toggle, isOpen }) => {
  const { t } = useTranslation();
  const [submitError, setSubmitError] = useState('');

  const channelsNames = useSelector(channelsNamesSelector);

  const { changingChannelId } = useContext(ChannelActionsContext);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (!isOpen) setSubmitError('');
  }, [isOpen]);

  const handleSubmit = async (data) => {
    const { channelName } = data;

    const uniqueSchema = Yup.string().notOneOf(channelsNames);

    try {
      uniqueSchema.validateSync(channelName);

      socket.emit('renameChannel', { id: changingChannelId, name: channelName });
      toggle();
    } catch (error) {
      setSubmitError('Name of the channel must be unique');
    }
  };

  return (
    <ChatModal isOpen={isOpen} title={t('renameChannelModal')}>
      <CommonForm
        trySubmit={handleSubmit}
        initialValues={initialValues}
        inputsProps={initialValuesInputsProps}
        validationSchema={channelNameSchema}
        submitError={submitError}
        t={t}
      >
        <Button variant="secondary" type="button" onClick={toggle} className="d-inline ms-3">{t('cancel')}</Button>
      </CommonForm>
    </ChatModal>
  );
};

export default RenameChannelModal;
