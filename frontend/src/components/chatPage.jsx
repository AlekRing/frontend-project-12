/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Chat from './chat';
import { addMessages } from '../store/reducers/chatMessages';
import { addChannels, changeCurrentChannelId } from '../store/reducers/chatChannels';
import { selectModal } from '../store/selectors/selectors';
import { useAuth } from '../hooks/useAuth';
import routes from '../api/routes';
import Modals from './Modals';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    isLoggedIn, logOut, getAuthHeader,
  } = useAuth();

  const modal = useSelector(selectModal);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Chat />
      <Modals modal={modal} />
    </>
  );
};

export default ChatPage;
