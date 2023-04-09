import { createSlice } from '@reduxjs/toolkit';

export const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    isAddChannelModalOpen: false,
    isRenameChannelModalOpen: false,
    isRemoveChannelModalOpen: false,
    changingChannelId: null,
  },
  reducers: {
    toggleAddChannelModal: (state) => ({
      ...state,
      isAddChannelModalOpen: !state.isAddChannelModalOpen,
    }),
    toggleRenameModal: (state) => ({
      ...state,
      isRenameChannelModalOpen: !state.isRenameChannelModalOpen,
    }),
    toggleRemoveModal: (state) => ({
      ...state,
      isRemoveChannelModalOpen: !state.isRemoveChannelModalOpen,
    }),
    setChangingChannelId: (state, { payload }) => ({
      ...state,
      changingChannelId: payload,
    }),
  },
});

export const {
  toggleAddChannelModal,
  toggleRenameModal,
  toggleRemoveModal,
  setChangingChannelId,
} = modalsSlice.actions;

export default modalsSlice.reducer;
