import { createSlice } from '@reduxjs/toolkit';

export const chatChannelsSlice = createSlice({
  name: 'chatChannels',
  initialState: {
    channels: [],
    currentChannelId: null,
  },
  reducers: {
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
  changeCurrentChannelId, addChannel, removeChannel, renameChannel,
} = chatChannelsSlice.actions;

export default chatChannelsSlice.reducer;
