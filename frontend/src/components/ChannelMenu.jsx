import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setChangingChannelId, toggleRemoveModal, toggleRenameModal } from '../store/reducers/modals';

const ChannelMenu = ({ channelId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleRemoveChannel = () => {
    dispatch(toggleRemoveModal());
    dispatch(setChangingChannelId(channelId));
  };

  const handleRenameChannel = (e) => {
    e.stopPropagation();

    dispatch(toggleRenameModal());
    dispatch(setChangingChannelId(channelId));
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
        <Dropdown.Item className="text-danger" onClick={handleRemoveChannel}>
          {t('deleteChannelMenu')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChannelMenu;
