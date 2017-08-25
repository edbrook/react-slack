import React, { Component } from 'react';
import Channels from './Channels';
import MessageDisplay from './MessageDisplay';
import MessageEntry from './MessageEntry';
import People from './People';

import './Slack.css';

// DUMMY DATA -------------------------
const user_me = {
  id: 239479,
  name: "Me",
  avatarId: "43YN9AVT8YN84TY8YTBITBVILE",
};

const user_slack = {
  id: 487,
  name: "SlackClone",
  avatarId: "0T9Y34N0TAY298C98389ACN89Y",
};

const user_tux = {
  id: 32894,
  name: "Tux",
  avatarId: "94TYVA903N4YPT098P4NA94TUS",
};
// ------------------------------------

export default class Slack extends Component {
  constructor(props) {
    super(props);

    this.CHANNEL_TYPE = 0;
    this.PERSON_TYPE = 1;
    
    this.DEFAULT_GROUP = "home";  // DEMO DATA
    this.DEFAULT_GROUP_TYPE = this.CHANNEL_TYPE;

    this.state = {
      currentUser: user_me, // DEMO DATA
      group: this.DEFAULT_GROUP,
      group_type: this.DEFAULT_GROUP_TYPE,
      people: [ user_me, user_slack, user_tux ],  // DEMO DATA
      channels: [ "home", "python", "react", "redux", "javascript" ], // DEMO DATA
      messages: [],
    };

    // DEMO DATA
    this.state.messages = [
      this.createMessage(user_slack, "Hello users from Slack Clone!"),
      this.createMessage(user_me, "This should be in the " + this.DEFAULT_GROUP + " group!"),
      {
        id: Math.floor(Math.random() * 1000000),
        date: new Date(),
        sender: user_slack,
        recipient: user_me,
        recipient_type: this.PERSON_TYPE,
        text: "Hello, from Slack Clone!",
      },
      {
        id: Math.floor(Math.random() * 1000000),
        date: new Date(),
        sender: user_slack,
        recipient: user_tux,
        recipient_type: this.PERSON_TYPE,
        text: "Hello Tux, from Slack Clone!",
      }
    ];
    // -------
  }

  createMessage = (sender, text) => {
    return {
      id: Math.floor(Math.random() * 1000000), // DEMO DATA
      date: new Date(),   // DEMO DATA
      sender,
      recipient: this.state.group,
      recipient_type: this.state.group_type,
      text,
    };
  }

  sendMessage = (msg) => {
    const message = this.createMessage(this.state.currentUser, msg);
    const messages = this.state.messages.concat(message);
    this.setState({ messages });
  }

  channelSelected = (selected) => {
    this.setState({
      group: selected.channel,
      group_type: this.CHANNEL_TYPE,
    });
  }

  personSelected = (selected) => {
    this.setState({
      group: selected.person,
      group_type: this.PERSON_TYPE,
    });
  }

  render() {
    const { group, group_type } = this.state;
    const selected_channel = (group_type===this.CHANNEL_TYPE?group:null);
    const selected_person = (group_type===this.PERSON_TYPE?group.id:null);
    const messages = this.state.messages.filter((msg) => {
      let ans = false;
      switch (group_type) {
        case this.CHANNEL_TYPE:
          ans = msg.recipient === group;
          break;
        case this.PERSON_TYPE:
          let senderIsCurrentUser = msg.sender.id === this.state.currentUser.id;
          let senderIsSelectedUser = msg.sender.id === selected_person;
          let recipIsCurrentUser = msg.recipient.id === this.state.currentUser.id;
          let recipIsSelectedUser = msg.recipient.id === selected_person;
          ans = (
            (senderIsCurrentUser && recipIsSelectedUser) ||
            (senderIsSelectedUser && recipIsCurrentUser)
          );
          break;
        default:
          ans = false;
      }
      return ans;
    });

    return (
      <div id="slack">
        <div id="sidebar">
          <h1>Slack Clone</h1>
            <Channels
              channels={this.state.channels}
              selected={selected_channel}
              onChange={this.channelSelected}/>
            <People
              people={this.state.people.filter((p) => this.state.currentUser.id!==p.id)}
              selected={selected_person}
              onChange={this.personSelected}/>
          </div>
        <div id="content">
          <MessageDisplay messages={messages}/>
          <MessageEntry onSubmit={this.sendMessage}/>
        </div>
      </div>
    );
  }
}