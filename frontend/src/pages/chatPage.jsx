import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Chat from '../containers/chat';
import { addToChat } from '../store/reducers/chat';
import AddChannelModal from '../components/AddChannelModal';
import ChannelActionsContext from '../store/context/channelActionsContext';
import RemoveChannelModal from '../components/RemoveChannelModal';
import RenameChannelModal from '../components/RenameChannelModal';

const ChatPage = ({ token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [changingChannelId, setChangingChannelId] = useState(null);

  useEffect(() => {
    if (!token || token === 'undefined') return;

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
          localStorage.removeItem('token');
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
      isAddModalOpen,
      toggleRemoveModal,
      toggleRenameModal,
      changingChannelId,
      setChangingChannelId: (id) => setChangingChannelId(id),
    }),
    [isAddModalOpen, changingChannelId, toggleRemoveModal, toggleRenameModal],
  );

  return (
    <>
      <AddChannelModal isOpen={isAddModalOpen} toggle={toggleAddModal} />
      <ChannelActionsContext.Provider value={passingContext}>
        <Chat openModal={toggleAddModal} />
        <RenameChannelModal isOpen={isRenameModalOpen} toggle={toggleRenameModal} />
        <RemoveChannelModal isOpen={isRemoveModalOpen} toggle={toggleRemoveModal} />
      </ChannelActionsContext.Provider>
    </>
  );
};

export default ChatPage;
