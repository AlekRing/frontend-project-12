import { useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useTranslation } from 'react-i18next';
import ChatContext from '../store/context/chatContext';

const ChannelMenu = ({ channelId }) => {
  const { t } = useTranslation();
  const { toggleRemoveModal, toggleRenameModal, setChangingChannelId } = useContext(ChatContext);

  const handleRemoveChannel = () => {
    toggleRemoveModal();
    setChangingChannelId(channelId);
  };

  const handleRenameChannel = (e) => {
    e.stopPropagation();

    toggleRenameModal();
    setChangingChannelId(channelId);
  };

  const handleClick = (e) => e.stopPropagation();

  return (
    <DropdownButton title="" size="sm" variant="secondary" onClick={handleClick}>
      <Dropdown.Item onClick={handleRenameChannel}>{t('renameChannelMenu')}</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item className="text-danger" onClick={handleRemoveChannel}>{t('deleteChannelMenu')}</Dropdown.Item>
    </DropdownButton>
  );
};

export default ChannelMenu;
