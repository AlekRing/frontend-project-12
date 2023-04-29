import { ADD_MODAL, REMOVE_MODAL, RENAME_MODAL } from '../constants';
import AddChannelModal from './AddChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';

const Modals = ({ modal }) => {
  switch (modal) {
    case RENAME_MODAL:
      return <RenameChannelModal />;
    case REMOVE_MODAL:
      return <RemoveChannelModal />;
    case ADD_MODAL:
      return <AddChannelModal />;
    default:
      return null;
  }
};

export default Modals;
