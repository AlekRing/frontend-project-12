import React from 'react';
import styles from './styles.module.css';

const MessagesList = ({ messages, currentChannelId, t }) => (
  <ul key={currentChannelId} className={styles.messagesList}>
    {messages.length ? messages.map(({ body, id }) => <li key={id}>{body}</li>) : t('noMessages')}
  </ul>
);

export default MessagesList;
