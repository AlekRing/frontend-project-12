import React from 'react';

const MessagesList = ({ messages, currentChannelId }) => (
  <div>
    <ul key={currentChannelId}>
      {
        messages.length ? messages.map(({ body, id }) => (
          <li key={id}>{body}</li>
        ))
          : 'No messages yet'
      }
    </ul>
  </div>
);

export default MessagesList;
