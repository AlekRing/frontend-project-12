import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { updateModals } from '../store/reducers/modals';
import { REMOVE_MODAL, RENAME_MODAL } from '../constants';

const ChannelMenu = ({ channelId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleRemoveChannel = () => {
    dispatch(updateModals({ modal: REMOVE_MODAL, channelId }));
  };

  const handleRenameChannel = (e) => {
    e.stopPropagation();

    dispatch(updateModals({ modal: RENAME_MODAL, channelId }));
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
