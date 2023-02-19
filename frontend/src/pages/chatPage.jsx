import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Chat from '../containers/Chat';
import {
  addToChat, addMessage, addChannel, changeCurrentChannelId,
} from '../store/reducers/chat';
import { chatSelector } from '../store/selectors/chat';
import AddChannelModal from '../components/AddChannelModal';
import ChatContext from '../store/context/chatContext';
import RemoveChannelModal from '../components/RemoveChannelModal';

const ChatPage = ({ token }) => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const chat = useSelector(chatSelector);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  useEffect(() => {
    if (!token) return;

    const socketIo = io('', {
      withCredentials: true,
      Authorization: `bearer ${token}`,
    });

    setSocket(socketIo);
  }, [dispatch, token]);

  useEffect(() => {
    if (!socket) return;

    socket.on('disconnect', () => {
      console.error('disconnect', socket);
    });

    socket.on('newMessage', (payload) => {
      dispatch(addMessage(payload));
    });

    socket.on('newChannel', (payload) => {
      dispatch(addChannel(payload));

      const { id } = payload;
      dispatch(changeCurrentChannelId(id));
    });

    socket.on('removeChannel', (payload) => {
      console.log(payload); // { id: 6 };
    });

    socket.on('renameChannel', (payload) => {
      console.log(payload); // { id: 7, name: "new name channel", removable: true }
    });

    return () => {
      socket.off('newChannel');
      socket.off('newMessage');
      socket.off('disconnect');
      socket.off('removeChannel');
      socket.off('renameChannel');
    };
  }, [dispatch, socket]);

  useEffect(() => {
    const getChannels = async () => {
      try {
        const response = await axios.get('/api/v1/data', {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });

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

  const toggleAddModal = () => setIsAddModalOpen((p) => !p);
  const toggleRemoveModal = useCallback(
    () => setIsRemoveModalOpen((p) => !p),
    [setIsRemoveModalOpen],
  );

  const passingContext = useMemo(
    () => ({ socket, isAddModalOpen, toggleRemoveModal }),
    [isAddModalOpen, socket, toggleRemoveModal],
  );

  console.log(isRemoveModalOpen);

  return (
    <ChatContext.Provider value={passingContext}>
      <Chat sendMessage={sendMessage} openModal={toggleAddModal} />
      <AddChannelModal isOpen={isAddModalOpen} toggle={toggleAddModal} />
      <RemoveChannelModal isOpen={isRemoveModalOpen} toggle={toggleRemoveModal} />
    </ChatContext.Provider>
  );
};

export default ChatPage;
