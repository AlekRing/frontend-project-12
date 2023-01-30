import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: null,
  messages: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addToChat: (state, { payload }) => (payload),
    addMessage: (state, { payload }) => ({
      ...state,
      messages: state.messages.push(payload),
    }),
    changeCurrentChannelId: (state, { payload }) => ({
      ...state,
      currentChannelId: payload,
    }),
    addChannel: (state, { payload }) => ({
      ...state,
      channels: state.channels.push(payload),
    }),
  },
});

export const { addToChat, addMessage, changeCurrentChannelId } = chatSlice.actions;

export default chatSlice.reducer;
