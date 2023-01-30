/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import classnames from 'classnames';
import styles from './styles.module.css';

const ChannelsList = ({ channels, changeChannel, openModal }) => (
  <div>
    <ul className="list-group">
      <li className="list-group-item text-capitalize fw-bold">
        <span className="fw-bold">Channels</span>
        {' '}
        <button className={classnames('fw-bold', styles.channelsPlus)} onClick={openModal} type="button">+</button>
      </li>
      {channels.map((channel) => (
        <li
          key={channel.id}
          data-id={channel.id}
          className="list-group-item list-group-item-action text-capitalize"
          onClick={changeChannel}
        >
          #
          {' '}
          {channel.name}
        </li>
      ))}
    </ul>
  </div>
);

export default ChannelsList;
