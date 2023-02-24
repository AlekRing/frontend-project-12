import React from 'react';

const MessagesList = ({ messages, currentChannelId, t }) => (
  <ul key={currentChannelId}>
    {
        messages.length ? messages.map(({ body, id }) => (
          <li key={id}>{body}</li>
        ))
          : t('noMessages')
      }
  </ul>
);

export default MessagesList;
