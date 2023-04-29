/* eslint-disable import/prefer-default-export */
export const chatChannelsSelector = (state) => state.chatChannels;
export const currentChatMessagesSelector = (state) => state.chatMessages.messages.filter(
  (message) => message.channelId === state.chatChannels.currentChannelId,
);
export const channelsNamesSelector = (state) => state.chatChannels.channels.map((ch) => ch.name);
export const userNameSelector = (state) => state.user.userName;

export const selectModal = (state) => state.modals.modal;
export const selectchannelId = (state) => state.modals.channelId;
export const selectChangingChannel = (state) => {
  const id = state.modals.channelId;
  const { channels } = state.chatChannels;

  const channel = channels.find((ch) => ch.id === id);
  return channel;
};
