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
    renameChannel: (state, { payload }) => {
      const channelIndex = state.channels.findIndex((ch) => ch.id === payload.id);

      const channels = [...state.channels];
      channels[channelIndex] = payload;

      return {
        ...state,
        channels,
      };
    },
  },
});

export const {
  addToChat, addMessage, changeCurrentChannelId, addChannel, removeChannel, renameChannel,
} = chatSlice.actions;

export default chatSlice.reducer;
