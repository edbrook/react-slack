import React, { Component } from 'react';
import Message from './Message';

class MessageDisplay extends Component {
  constructor(props) {
    super(props);
    this.msgList = null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.msgList.scrollHeight > this.msgList.clientHeight) {
      this.msgList.scrollTop = this.msgList.scrollHeight;
    }
  }

  render() {
    const msgs = this.props.messages.map((msg) => {
      return (
        <Message key={msg.id} message={msg}/>
      );
    });

    if (msgs.length === 0) {
      return (
        <div id="msgList" ref={(comp) => {this.msgList = comp;}}>
          <h1 className="noMessages">NO MESSAGES YET!</h1>
        </div>
      );
    }

    return (
      <div id="msgList" ref={(comp) => {this.msgList = comp;}}>
        <div id="msgs">
          {msgs}
        </div>
      </div>
    );
  }
}

export default MessageDisplay;