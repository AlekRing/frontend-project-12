import { Formik } from 'formik';
import React, { useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import filter from 'leo-profanity';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import ChannelsList from '../components/ChannelsList';
import MessagesList from '../components/MessagesList';
import { changeCurrentChannelId } from '../store/reducers/chat';
import { chatSelector, currentChatMessagesSelector } from '../store/selectors/chat';
import ChatContext from '../store/context/chatContext';

const initialValue = { message: '' };
const stringReg = /[a-zA-Z]/i;

const Chat = ({ openModal }) => {
  const dispatch = useDispatch();
  const chat = useSelector(chatSelector);
  const messages = useSelector(currentChatMessagesSelector);
  const formRef = useRef();
  const { t } = useTranslation();

  const { socket } = useContext(ChatContext);

  const sendMessage = ({ message }, { resetForm }) => {
    if (!message) return;

    const data = { body: '', channelId: chat.currentChannelId };

    if (stringReg.exec(message)) {
      filter.loadDictionary();

      data.body = filter.clean(message);
    } else {
      filter.loadDictionary('ru');
      data.body = filter.clean(message);
    }

    socket.emit('newMessage', data);
    resetForm();
  };

  const changeChannel = (e) => {
    const channelId = Number(e.target.getAttribute('data-id'));

    if (channelId === chat.currentChannelId) return;

    dispatch(changeCurrentChannelId(channelId));
    console.log(channelId);
  };

  return (
    <div className="container">
      <div className="row align-items-start pt-4">
        <div className="col" style={{ maxWidth: '230px' }}>
          <ChannelsList
            channels={chat.channels}
            changeChannel={changeChannel}
            openModal={openModal}
            currentChannelId={chat.currentChannelId}
            t={t}
          />
        </div>
        <div className="col border rounded pt-2">
          <MessagesList messages={messages} currentChannelId={chat.currentChannelId} t={t} />
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
