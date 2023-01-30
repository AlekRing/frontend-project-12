import { configureStore } from '@reduxjs/toolkit';
import chat from './reducers/chat';

export default configureStore({
  reducer: {
    chat,
  },
});
