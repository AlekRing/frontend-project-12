import { Formik } from 'formik';
import React, { useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import filter from 'leo-profanity';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import ChannelsList from './channelsList';
import MessagesList from './messagesList';
import { changeCurrentChannelId } from '../store/reducers/chatChannels';
import { chatChannelsSelector, currentChatMessagesSelector } from '../store/selectors/selectors';
import ChatContext from '../store/context/chatContext';
import { toggleAddChannelModal } from '../store/reducers/modals';

const initialValue = { message: '' };
const stringReg = /[a-zA-Z]/i;

const Chat = () => {
  const dispatch = useDispatch();
  const chatChannels = useSelector(chatChannelsSelector);
  const messages = useSelector(currentChatMessagesSelector);
  const formRef = useRef();
  const { t } = useTranslation();

  const { chatActions } = useContext(ChatContext);

  const sendMessage = ({ message }, { resetForm }) => {
    if (!message) return;

    const data = { body: '', channelId: chatChannels.currentChannelId };

    if (stringReg.exec(message)) {
      filter.loadDictionary();

      data.body = filter.clean(message);
    } else {
      filter.loadDictionary('ru');
      data.body = filter.clean(message);
    }

    chatActions.sendMessage(data);
    resetForm();
  };

  const changeChannel = (e) => {
    const channelId = Number(e.target.getAttribute('data-id'));

    if (channelId === chatChannels.currentChannelId) return;

    dispatch(changeCurrentChannelId(channelId));
  };

  const toggleAddModal = () => dispatch(toggleAddChannelModal());

  return (
    <div className="container">
      <div className="row align-items-start pt-4">
        <div className="col" style={{ maxWidth: '230px' }}>
          <ChannelsList
            channels={chatChannels.channels}
            changeChannel={changeChannel}
            openModal={toggleAddModal}
            currentChannelId={chatChannels.currentChannelId}
            t={t}
          />
        </div>
        <div className="col border rounded pt-2">
          <MessagesList messages={messages} currentChannelId={chatChannels.currentChannelId} t={t} />
          <Formik initialValues={initialValue} onSubmit={sendMessage} validateOnBlur>
            {({
 handleSubmit, handleChange, values, resetForm,
}) => (
  <Form onSubmit={(data) => handleSubmit(data, resetForm)} ref={formRef}>
    {Object.keys(initialValue).map((key) => (
      <Form.Group className="mb-3 input-group flex-nowrap" key={key} controlId={key}>
        <Form.Control
          type="text"
          placeholder={t('startMessagePlaceholder')}
          aria-label={t('ariaNewMessage')}
          onChange={handleChange}
          className="form-control"
          name={key}
          value={values[key]}
        />
        <Button className="input-group-text" variant="primary" type="submit">
          {t('sendMessageButton')}
        </Button>
      </Form.Group>
                ))}
  </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Chat;
