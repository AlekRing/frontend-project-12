import React, { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/esm/Button';
import { useTranslation } from 'react-i18next';
import CommonForm from './CommonForm';
import ChatModal from './ChatModal';
import { channelsNamesSelector } from '../store/selectors/selectors';
import ChatContext from '../store/context/chatContext';
import { setModal } from '../store/reducers/modals';
import { changeCurrentChannelId } from '../store/reducers/chatChannels';

const initialValues = { channelName: '' };
const initialValuesInputsProps = {
  channelName: { type: 'text', placeholder: 'chatNamePlaceholder' },
};

const AddChannelModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [submitError, setSubmitError] = useState('');

  const channelsNames = useSelector(channelsNamesSelector);

  const { chatActions } = useContext(ChatContext);

  const toggle = () => dispatch(setModal(''));

  useEffect(() => {
    setSubmitError('');
  }, []);

  const handleSubmit = async (data) => {
    const { channelName } = data;

    chatActions.createChannel(channelName, (response) => {
      dispatch(changeCurrentChannelId(response.data.id));
      toast.success(t('channelAdded'));
      toggle();
    });
  };

  const channelNameSchema = Yup.object().shape({
    channelName: Yup.string().min(2, 'tooShort').max(50, 'tooLong').required('required')
      .notOneOf(channelsNames),
  });

  return (
    <ChatModal title={t('addChannelTitle')}>
      <CommonForm
        trySubmit={handleSubmit}
        initialValues={initialValues}
        inputsProps={initialValuesInputsProps}
        validationSchema={channelNameSchema}
        submitError={submitError}
        submitButtonText={t('submitAddChannelButton')}
      >
        <Button variant="secondary" type="button" onClick={toggle} className="d-inline ms-3">
          {t('cancel')}
        </Button>
      </CommonForm>
    </ChatModal>
  );
};

export default AddChannelModal;
