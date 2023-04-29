import { createSlice } from '@reduxjs/toolkit';
import logout from '../actions/auth';

const initialState = {
  userName: '',
};

export const modalsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, { payload }) => ({
      ...state,
      userName: payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => initialState);
  },
});

export const {
  setUserName,
} = modalsSlice.actions;

export default modalsSlice.reducer;
