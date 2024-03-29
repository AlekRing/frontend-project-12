import React, { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/esm/Button';
import { useTranslation } from 'react-i18next';
import CommonForm from './CommonForm';
import ChatModal from './ChatModal';
import {
  channelsNamesSelector,
  selectChangingChannel,
  selectchannelId,
} from '../store/selectors/selectors';
import ChatContext from '../store/context/chatContext';
import { setModal } from '../store/reducers/modals';

const initialValues = { channelName: '' };
const initialValuesInputsProps = {
  channelName: { type: 'text', placeholder: 'chatNamePlaceholder' },
};

const channelNameSchema = Yup.object().shape({
  channelName: Yup.string().min(2, 'Too Short!').max(25, 'Too Long!').required('Required'),
});

const RenameChannelModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [submitError, setSubmitError] = useState('');

  const channelsNames = useSelector(channelsNamesSelector);
  const channelId = useSelector(selectchannelId);
  const changingChannelName = useSelector(selectChangingChannel)?.name;

  const { chatActions } = useContext(ChatContext);

  const toggle = () => dispatch(setModal(''));

  useEffect(() => {
    setSubmitError('');
  }, []);

  const handleSubmit = async (data) => {
    const { channelName } = data;

    const uniqueSchema = Yup.string().notOneOf(channelsNames);

    try {
      uniqueSchema.validateSync(channelName);

      chatActions.renameChannel(channelId, channelName, () => {
        toast.success(t('channelRenamed'));
      });
      toggle();
    } catch (error) {
      setSubmitError('Name of the channel must be unique');
    }
  };

  initialValues.channelName = changingChannelName;

  return (
    <ChatModal title={t('renameChannelModal')}>
      <CommonForm
        trySubmit={handleSubmit}
        initialValues={initialValues}
        inputsProps={initialValuesInputsProps}
        validationSchema={channelNameSchema}
        submitError={submitError}
      >
        <Button variant="secondary" type="button" onClick={toggle} className="d-inline ms-3">
          {t('cancel')}
        </Button>
      </CommonForm>
    </ChatModal>
  );
};

export default RenameChannelModal;
