import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Chat from '../containers/chat';
import { addToChat, addMessage } from '../store/reducers/chat';
import { chatSelector } from '../store/selectors/chat';
import ChatModal from '../containers/ChatModal';

const ChatPage = ({ token }) => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const chat = useSelector(chatSelector);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!token || socket) return;

    const socketIo = io('', {
      withCredentials: true,
      Authorization: `bearer ${token}`,
    });

    setSocket(socketIo);
    socketIo.on('connect', () => {});

    socketIo.on('disconnect', () => {
      console.error('disconnect', socketIo);
    });

    socketIo.on('newMessage', (payload) => {
      console.log('newMessage', payload);
      dispatch(addMessage(payload));
    });

    socket.on('newChannel', (payload) => {
      console.log(payload);
    });
  }, [dispatch, socket, token]);

  useEffect(() => {
    const getChannels = async () => {
      try {
        const response = await axios.get('/api/v1/data', {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        console.warn('Initiate: ', response);

        dispatch(addToChat(response.data));
      } catch (error) {
        console.log(error);
      }
    };

    getChannels();
  }, [dispatch, token]);

  const sendMessage = ({ message }) => {
    socket.emit('newMessage', { body: message, channelId: chat.currentChannelId });
  };

  const openModal = () => setIsModalOpen(true);
  const handleSubmit = ({ channelName }) => {
    console.log(channelName);
    socket.emit('newChannel', { name: channelName });
  };

  // const testCreate = async () => {
  //   try {
  //     const response = await axios.post('/api/v1/signup', {
  //       headers: {
  //         Authorization: `bearer ${token}`,
  //       },
  //       body: {
  //         username: 'asterisk',
  //         password: 'asterisk',
  //       },
  //     });
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  //  addNewChannel={}
  return (
    <>
      <Chat sendMessage={sendMessage} openModal={openModal} />
      <ChatModal isOpen={isModalOpen} handleSubmit={handleSubmit} />
    </>
  );
};

export default ChatPage;
