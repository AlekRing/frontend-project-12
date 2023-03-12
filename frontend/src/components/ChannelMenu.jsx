import { useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import ChannelActionsContext from '../store/context/channelActionsContext';

const ChannelMenu = ({ channelId }) => {
  const { t } = useTranslation();
  const {
    toggleRemoveModal,
    toggleRenameModal,
    setChangingChannelId,
  } = useContext(ChannelActionsContext);

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
    <Dropdown onClick={handleClick}>
      <Dropdown.Toggle title="" size="sm" variant="secondary">
        <span className="visually-hidden">{t('channelMenu')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleRenameChannel}>{t('renameChannelMenu')}</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item className="text-danger" onClick={handleRemoveChannel}>{t('deleteChannelMenu')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChannelMenu;
