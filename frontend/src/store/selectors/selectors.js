/* eslint-disable import/prefer-default-export */

export const chatChannelsSelector = (state) => state.chatChannels;
export const currentChatMessagesSelector = (state) => state.chatMessages.messages.filter(
  (message) => message.channelId === state.chatChannels.currentChannelId,
);
export const channelsNamesSelector = (state) => state.chatChannels.channels.map((ch) => ch.name);

export const selectIsAddChannelmodalOpen = (state) => state.modals.isAddChannelModalOpen;
export const selectIsRenameChannelmodalOpen = (state) => state.modals.isRenameChannelModalOpen;
export const selectIsRemoveChannelmodalOpen = (state) => state.modals.isRemoveChannelModalOpen;
export const selectChangingChannelId = (state) => state.modals.changingChannelId;
export const selectChangingChannel = (state) => {
  const id = state.modals.changingChannelId;
  const { channels } = state.chatChannels;

  const channel = channels.find((ch) => ch.id === id);
  return channel;
};
