import React, { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/esm/Button';
import CommonForm from './CommonForm';
import ChatModal from '../containers/ChatModal';
import { channelsNamesSelector } from '../store/selectors/chat';
import ChatContext from '../store/context/chatContext';

const initialValues = { name: '' };
const initialValuesInputsProps = { name: { type: 'text', placeholder: 'Beep boop chat' } };

const channelNameSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const AddChannelModal = ({ toggle, isOpen }) => {
  const [submitError, setSubmitError] = useState('');

  const channelsNames = useSelector(channelsNamesSelector);

  const { socket } = useContext(ChatContext);

  useEffect(() => {
    if (!isOpen) setSubmitError('');
  }, [isOpen]);

  const handleSubmit = async (data) => {
    const { name } = data;

    const uniqueSchema = Yup.string().notOneOf(channelsNames);

    try {
      uniqueSchema.validateSync(name);

      socket.emit('newChannel', data);
      toggle();
    } catch (error) {
      setSubmitError('Name of the channel must be unique');
    }
  };

  return (
    <ChatModal isOpen={isOpen}>
      <CommonForm
        trySubmit={handleSubmit}
        initialValues={initialValues}
        inputsProps={initialValuesInputsProps}
        validationSchema={channelNameSchema}
        submitError={submitError}
        title="Add new channel."
      />
      <Button variant="secondary" type="button" onClick={toggle} className="d-inline">Cancel</Button>
    </ChatModal>
  );
};

export default AddChannelModal;
