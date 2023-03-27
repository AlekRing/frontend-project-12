/* eslint-disable import/prefer-default-export */

export const chatChannelsSelector = (state) => state.chatChannels;
export const currentChatMessagesSelector = (state) => state.chatMessages.messages.filter(
  (message) => message.channelId === state.chatChannels.currentChannelId,
);
export const channelsNamesSelector = (state) => state.chatChannels.channels.map((ch) => ch.name);
