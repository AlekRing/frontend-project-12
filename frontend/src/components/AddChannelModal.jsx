import React, { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/esm/Button';
import { useTranslation } from 'react-i18next';
import CommonForm from './CommonForm';
import ChatModal from '../containers/ChatModal';
import { channelsNamesSelector } from '../store/selectors/chat';
import ChatContext from '../store/context/chatContext';

const initialValues = { channelName: '' };
const initialValuesInputsProps = { channelName: { type: 'text', placeholder: 'chatNamePlaceholder' } };

const channelNameSchema = Yup.object().shape({
  channelName: Yup.string()
    .min(2, 'tooShort')
    .max(50, 'tooLong')
    .required('required'),
});

const AddChannelModal = ({ toggle, isOpen }) => {
  const { t } = useTranslation();
  const [submitError, setSubmitError] = useState('');

  const channelsNames = useSelector(channelsNamesSelector);

  const { socket } = useContext(ChatContext);

  useEffect(() => {
    if (!isOpen) setSubmitError('');
  }, [isOpen]);

  const handleSubmit = async (data) => {
    const { channelName } = data;

    const uniqueSchema = Yup.string().notOneOf(channelsNames);

    try {
      uniqueSchema.validateSync(channelName);

      socket.emit('newChannel', { name: channelName });
      toggle();
    } catch (error) {
      setSubmitError(t('uniqueChannelNameError'));
    }
  };

  return (
    <ChatModal isOpen={isOpen} title={t('addChannelTitle')}>
      <CommonForm
        trySubmit={handleSubmit}
        initialValues={initialValues}
        inputsProps={initialValuesInputsProps}
        validationSchema={channelNameSchema}
        submitError={submitError}
        submitButtonText={t('submitAddChannelButton')}
        t={t}
      >
        <Button variant="secondary" type="button" onClick={toggle} className="d-inline ms-3">{t('cancel')}</Button>
      </CommonForm>
    </ChatModal>
  );
};

export default AddChannelModal;