import { createSlice } from '@reduxjs/toolkit';
import logout from '../actions/auth';

const initialState = {
  modal: '',
  channelId: null,
};

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setModal: (state, { payload }) => ({
      ...state,
      modal: payload,
    }),
    updateModals: (state, { payload }) => payload,
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => initialState);
  },
});

export const {
  updateModals,
  setModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;
