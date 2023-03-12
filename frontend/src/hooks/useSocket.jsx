import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import {
  addMessage, addChannel, changeCurrentChannelId, removeChannel, renameChannel,
} from '../store/reducers/chat';

const socketInit = {
  socket: null,
  isReady: false,
};

const useSocket = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  if (socketInit.isReady) return socketInit.socket;

  socketInit.socket = io();

  socketInit.socket.on('newMessage', (payload) => {
    dispatch(addMessage(payload));
  });

  socketInit.socket.on('newChannel', (payload) => {
    dispatch(addChannel(payload));

    const { id } = payload;
    dispatch(changeCurrentChannelId(id));
    toast.success(t('channelAdded'));
  });

  socketInit.socket.on('removeChannel', (payload) => {
    dispatch(removeChannel(payload));
    toast.success(t('channelDeleted'));
  });

  socketInit.socket.on('renameChannel', (payload) => {
    dispatch(renameChannel(payload));
    toast.success(t('channelRenamed'));
  });

  socketInit.isReady = true;

  return socketInit.socket;
};

export default useSocket;
