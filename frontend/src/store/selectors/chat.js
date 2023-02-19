/* eslint-disable import/prefer-default-export */

export const chatSelector = (state) => state.chat;
export const currentChatMessagesSelector = (state) => state.chat.messages.filter(
  (message) => message.channelId === state.chat.currentChannelId,
);
export const channelsNamesSelector = (state) => state.chat.channels.map((ch) => ch.name);
