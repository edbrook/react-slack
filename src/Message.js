import React, { Component } from 'react';
import { dateToString } from './utils';

class Message extends Component {
  //<img alt={"avatar for " + msg.sender.name} .../>
  render() {
    const msg = this.props.message;
    return (
      <div className="message">
        <div className="avatar">
          <img alt="" src={"/imgs/avatar?id=" + msg.sender.avatarId}/>
        </div>
        <div className="msgContent">
          <div className="msgHeader">
            <span className="msgAuthor">{msg.sender.name}</span>
            <span className="msgDate">{dateToString(msg.date)}</span>
          </div>
          <div className="msgText">{msg.text}</div>
        </div>
      </div>
    );
  }
}

export default Message;