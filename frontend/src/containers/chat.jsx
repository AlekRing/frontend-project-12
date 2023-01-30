import { Formik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ChannelsList from '../components/channelsList';
import MessagesList from '../components/messagesList';
import Navbar from '../components/navbar';
import { changeCurrentChannelId } from '../store/reducers/chat';
import { chatSelector, currentChatMessagesSelector } from '../store/selectors/chat';

const initialValue = { message: '' };

const Chat = ({ sendMessage, openModal }) => {
  const dispatch = useDispatch();
  const chat = useSelector(chatSelector);
  const messages = useSelector(currentChatMessagesSelector);

  const changeChannel = (e) => {
    const channelId = Number(e.target.getAttribute('data-id'));

    if (channelId === chat.currentChannelId) return;

    dispatch(changeCurrentChannelId(channelId));
    console.log(channelId);
  };

  return (
    <div className="container">
      <Navbar />
      <div className="row align-items-start pt-4">
        <div className="col" style={{ maxWidth: '230px' }}>
          <ChannelsList
            channels={chat.channels}
            changeChannel={changeChannel}
            openModal={openModal}
          />
        </div>
        <div className="col border rounded pt-2">
          <MessagesList messages={messages} currentChannelId={chat.currentChannelId} />
          <Formik
            initialValues={initialValue}
            onSubmit={sendMessage}
            validateOnBlur
          >
            {({
              handleSubmit,
              handleChange,
              values,
            }) => (
              <Form>
                {
                  Object.keys(initialValue).map((key) => (
                    <Form.Group className="mb-3 input-group flex-nowrap" key={key} controlId={key}>
                      <Form.Control
                        type="text"
                        placeholder="start message"
                        onChange={handleChange}
                        className="form-control"
                        name={key}
                        value={values[key]}
                      />
                      <Button className="input-group-text" variant="primary" type="submit" onClick={handleSubmit}>
                        {'>'}
                      </Button>
                    </Form.Group>
                  ))
                }
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Chat;
