import { createSlice } from '@reduxjs/toolkit';

export const chatMessagesSlice = createSlice({
  name: 'chatMessages',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessages: (state, { payload }) => ({
      ...state,
      messages: [...state.messages, ...payload],
    }),
  },
});

export const { addMessages } = chatMessagesSlice.actions;

export default chatMessagesSlice.reducer;
