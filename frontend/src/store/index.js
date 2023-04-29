import { configureStore } from '@reduxjs/toolkit';
import chatChannels from './reducers/chatChannels';
import chatMessages from './reducers/chatMessages';
import modals from './reducers/modals';
import user from './reducers/user';

export default configureStore({
  reducer: {
    chatChannels,
    chatMessages,
    modals,
    user,
  },
});
