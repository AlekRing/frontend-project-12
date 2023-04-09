import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Chat from './chat';
import AddChannelModal from './AddChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';
import { addMessages } from '../store/reducers/chatMessages';
import { addChannels, changeCurrentChannelId } from '../store/reducers/chatChannels';
import {
  selectIsAddChannelmodalOpen,
  selectIsRemoveChannelmodalOpen,
  selectIsRenameChannelmodalOpen,
} from '../store/selectors/selectors';
import { useAuth } from '../hooks/useAuth';
import routes from '../api/routes';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');

  return token ? { Authorization: `bearer ${token}` } : {};
};

const ChatPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isLoggedIn, logOut } = useAuth();

  const isAddModalOpen = useSelector(selectIsAddChannelmodalOpen);
  const isRenameModalOpen = useSelector(selectIsRenameChannelmodalOpen);
  const isRemoveModalOpen = useSelector(selectIsRemoveChannelmodalOpen);

  useEffect(() => {
    if (!isLoggedIn) return;

    const getChannels = async () => {
      try {
        const response = await axios.get(routes.fetchDataPath(), {
          headers: getAuthHeader(),
        });

        dispatch(addMessages(response.data.messages));
        dispatch(addChannels(response.data.channels));
        dispatch(changeCurrentChannelId(response.data.currentChannelId));
      } catch (error) {
        console.error(error);

        if (error.response.status === 401 || error.response.status === '401') {
          logOut();
          return;
        }

        toast.error(t('somethingWentWrong'));
      }
    };

    getChannels();
  }, []);

  return (
    <>
      <AddChannelModal isOpen={isAddModalOpen} />
      <Chat />
      <RenameChannelModal isOpen={isRenameModalOpen} />
      <RemoveChannelModal isOpen={isRemoveModalOpen} />
    </>
  );
};

export default ChatPage;
