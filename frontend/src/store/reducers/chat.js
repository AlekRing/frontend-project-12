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
      messages: [...state.messages, payload],
    }),
    changeCurrentChannelId: (state, { payload }) => ({
      ...state,
      currentChannelId: payload,
    }),
    addChannel: (state, { payload }) => ({
      ...state,
      channels: [...state.channels, payload],
    }),
    removeChannel: (state, { payload }) => ({
      ...state,
      channels: state.channels.filter((ch) => ch.id !== payload.id),
    }),
  },
});

export const {
  addToChat, addMessage, changeCurrentChannelId, addChannel, removeChannel,
} = chatSlice.actions;

export default chatSlice.reducer;
