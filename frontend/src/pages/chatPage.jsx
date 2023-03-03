import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Chat from '../containers/chat';
import {
  addToChat, addMessage, addChannel, changeCurrentChannelId, removeChannel, renameChannel,
} from '../store/reducers/chat';
import AddChannelModal from '../components/AddChannelModal';
import ChatContext from '../store/context/chatContext';
import RemoveChannelModal from '../components/RemoveChannelModal';
import RenameChannelModal from '../components/RenameChannelModal';

const ChatPage = ({ token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [socket, setSocket] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [changingChannelId, setChangingChannelId] = useState(null);

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

      toast.success(t('channelAdded'));
    });

    socket.on('removeChannel', (payload) => {
      dispatch(removeChannel(payload));
    });

    socket.on('renameChannel', (payload) => {
      dispatch(renameChannel(payload));
      toast.success(t('channelRenamed'));
    });

    return () => {
      socket.off('newChannel');
      socket.off('newMessage');
      socket.off('disconnect');
      socket.off('removeChannel');
      socket.off('renameChannel');
    };
  }, [dispatch, socket, t]);

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
        console.error(error);

        if (error.response.status === 401 || error.response.status === '401') {
          navigate('/login');
          return;
        }

        toast.error(t('somethingWentWrong'));
      }
    };

    getChannels();
  }, [dispatch, navigate, t, token]);

  const toggleAddModal = () => setIsAddModalOpen((p) => !p);
  const toggleRenameModal = useCallback(
    () => setIsRenameModalOpen((p) => !p),
    [setIsRenameModalOpen],
  );
  const toggleRemoveModal = useCallback(
    () => setIsRemoveModalOpen((p) => !p),
    [setIsRemoveModalOpen],
  );

  const passingContext = useMemo(
    () => ({
      socket,
      isAddModalOpen,
      toggleRemoveModal,
      toggleRenameModal,
      changingChannelId,
      setChangingChannelId: (id) => setChangingChannelId(id),
    }),
    [isAddModalOpen, changingChannelId, socket, toggleRemoveModal, toggleRenameModal],
  );

  return (
    <ChatContext.Provider value={passingContext}>
      <Chat openModal={toggleAddModal} />
      <AddChannelModal isOpen={isAddModalOpen} toggle={toggleAddModal} />
      <RenameChannelModal isOpen={isRenameModalOpen} toggle={toggleRenameModal} />
      <RemoveChannelModal isOpen={isRemoveModalOpen} toggle={toggleRemoveModal} />
    </ChatContext.Provider>
  );
};

export default ChatPage;
