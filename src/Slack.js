import React,  { Component } from 'react';
import './Slack.css';


// DUMMY DATA -------------------------
const user_ed = {
  id: 239479,
  name: "Ed",
  avatarId: "43YN9AVT8YN84TY8YTBITBVILE",
};

const user_slack = {
  id: 487,
  name: "SlackClone",
  avatarId: "0T9Y34N0TAY298C98389ACN89Y",
};
// ------------------------------------

const days = [
  'SUN','MON','TUE','WED','THR','FRI','SAT'];

const months = [
  'JAN','FEB','MAR','APR',
  'MAY','JUN','JUL','AUG',
  'SEP','OCT','NOV','DEC'];

function dateToString(date) {
  const day = days[date.getDay()];
  const dd = date.getDate(); 
  const mm = months[date.getMonth()];
  const yyyy = date.getFullYear();
  const time = date.toTimeString();
  return (
    day + " " + dd + " " + mm + " " + yyyy + " " + time
  );
}

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

function Channels(props) {
  const channels = props.channels.map((channel) => {
    return (
      <li
        key={channel}
        className={channel===props.selected?"selected":""}
        onClick={(e) => props.onChange({channel})}>
        # {channel}
      </li>
    );
  });

  return (
    <div id="channels">
      <h2>Channels</h2>
      <ul>
        {channels}
      </ul>
    </div>
  );
}

function People(props) {
  const people = props.people.map((person) => {
    return (
      <li
        key={person.id}
        className={person.id===props.selected?"selected":""}
        onClick={(e) => props.onChange({person})}>
        @ {person.name}
      </li>
    );
  });

  return (
    <div id="people">
      <h2>People</h2>
      <ul>
        {people}
      </ul>
    </div>
  );
}

class MessageEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
    }
  }

  handleChange = (event) => {
    const msg = event.target.value;
    this.setState({ msg });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.props.hasOwnProperty('onSubmit')) {
      this.props.onSubmit(this.state.msg);
    }
    this.setState({ msg: "" });
  }

  render() {
    const { msg } = this.state;
    return (
      <div id="msgEntry">
        <form id="inFrm" onSubmit={this.handleSubmit}>
          <input
            id="inTxt"
            type="text"
            value={msg}
            onChange={this.handleChange}
            placeholder="Type your message here. Press Enter to send."/>
        </form>
      </div>
    );
  }
}

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

export default class Slack extends Component {
  constructor(props) {
    super(props);

    this.CHANNEL_TYPE = 0;
    this.PERSON_TYPE = 1;
    
    this.DEFAULT_GROUP = "home";  // DEMO DATA
    this.DEFAULT_GROUP_TYPE = this.CHANNEL_TYPE;

    this.state = {
      currentUser: user_ed, // DEMO DATA
      group: this.DEFAULT_GROUP,
      group_type: this.DEFAULT_GROUP_TYPE,
      people: [ user_ed, user_slack ],  // DEMO DATA
      channels: [ "home", "python", "react", "redux", "javascript" ], // DEMO DATA
      messages: [],
    };

    // DEMO DATA
    this.state.messages = [
      this.createMessage(user_slack, "Hello users from Slack Clone!"),
      this.createMessage(user_ed, "This should be in the " + this.DEFAULT_GROUP + " group!"),
      {
        id: Math.floor(Math.random() * 1000000),
        date: new Date(),
        sender: user_slack,
        recipient: user_ed,
        recipient_type: this.PERSON_TYPE,
        text: "Hello Ed, from Slack Clone!",
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