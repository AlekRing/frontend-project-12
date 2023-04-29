import React from 'react';
import styles from './styles.module.css';

const MessagesList = ({
  messages,
  currentChannelId,
  t,
  scrollref,
}) => (
  <ul key={currentChannelId} className={styles.messagesList} ref={scrollref}>
    {messages.length ? messages.map(({ body, id, userName }) => (
      <li key={id}>
        <div className="fw-bold text-capitalize">
          {userName}
          :
          {' '}
        </div>
        {body}
      </li>
    )) : t('noMessages')}
  </ul>
);

export default MessagesList;
