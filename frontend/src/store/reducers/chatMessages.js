import { createSlice } from '@reduxjs/toolkit';
import logout from '../actions/auth';

const initialState = {
  messages: [],
};

export const chatMessagesSlice = createSlice({
  name: 'chatMessages',
  initialState,
  reducers: {
    addMessages: (state, { payload }) => ({
      ...state,
      messages: [...state.messages, ...payload],
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => initialState);
  },
});

export const { addMessages } = chatMessagesSlice.actions;

export default chatMessagesSlice.reducer;
