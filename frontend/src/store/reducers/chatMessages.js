import { createSlice } from '@reduxjs/toolkit';

export const chatMessagesSlice = createSlice({
  name: 'chatMessages',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, { payload }) => ({
      ...state,
      messages: [...state.messages, payload],
    }),
  },
});

export const { addMessage } = chatMessagesSlice.actions;

export default chatMessagesSlice.reducer;
