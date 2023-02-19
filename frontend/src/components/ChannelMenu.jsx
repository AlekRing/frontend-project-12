import { useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ChatContext from '../store/context/chatContext';

const ChannelMenu = ({ handleRenameChannel }) => {
  const { toggleRemoveModal } = useContext(ChatContext);

  return (
    <DropdownButton title="" size="sm" variant="secondary">
      <Dropdown.Item onClick={handleRenameChannel}>Переименовать</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item className="text-danger" onClick={toggleRemoveModal}>Удалить канал</Dropdown.Item>
    </DropdownButton>
  );
};

export default ChannelMenu;
