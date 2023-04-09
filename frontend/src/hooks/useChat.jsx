import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import {
  addChannels,
  changeCurrentChannelId,
  removeChannel,
  renameChannel as renameChannelReducer,
} from '../store/reducers/chatChannels';
import { addMessages } from '../store/reducers/chatMessages';

const socketInit = {
  socket: null,
  handlers: null,
};

const useChat = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  if (socketInit.handlers) return socketInit.handlers;

  socketInit.socket = io();

  socketInit.socket.on('newMessage', (payload) => {
    dispatch(addMessages([payload]));
  });

  socketInit.socket.on('newChannel', (payload) => {
    dispatch(addChannels([payload]));
  });

  socketInit.socket.on('removeChannel', (payload) => {
    dispatch(removeChannel(payload));
  });

  socketInit.socket.on('renameChannel', (payload) => {
    dispatch(renameChannelReducer(payload));
  });

  const sendMessage = (data) => {
    socketInit.socket.emit('newMessage', data);
  };

  const createChannel = (name) => {
    socketInit.socket.emit('newChannel', { name }, ({ data }) => {
      dispatch(changeCurrentChannelId(data.id));
      toast.success(t('channelAdded'));
    });
  };

  const deleteChannel = (id) => {
    socketInit.socket.emit('removeChannel', { id }, () => {
      toast.success(t('channelDeleted'));
    });
  };

  const renameChannel = (id, name) => {
    socketInit.socket.emit('renameChannel', { id, name }, () => {
      toast.success(t('channelRenamed'));
    });
  };

  socketInit.handlers = {
    sendMessage,
    createChannel,
    deleteChannel,
    renameChannel,
  };

  return socketInit.handlers;
};

export default useChat;
