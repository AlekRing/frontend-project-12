import { configureStore } from '@reduxjs/toolkit';
import chatChannels from './reducers/chatChannels';
import chatMessages from './reducers/chatMessages';

export default configureStore({
  reducer: {
    chatChannels,
    chatMessages,
  },
});
