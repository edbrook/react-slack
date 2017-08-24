import React,  { Component } from 'react';
import './Slack.css';

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
  //<img alt={"avatar for " + msg.user.name} .../>
  render() {
    const msg = this.props.message;
    return (
      <div className="message">
        <div className="avatar">
          <img alt="" src={"/imgs/avatar?id=" + msg.user.avatarId}/>
        </div>
        <div className="msgContent">
          <div className="msgHeader">
            <span className="msgAuthor">{msg.user.name}</span>
            <span className="msgDate">{dateToString(msg.date)}</span>
          </div>
          <div className="msgText">{msg.text}</div>
        </div>
      </div>
    );
  }
}

function Channels(props) {
  return (
    <div id="channels">
      <h2>Channels</h2>
      <ul>
        <li># python</li>
        <li># react</li>
        <li className="selected"># redux</li>
        <li># javascript</li>
      </ul>
    </div>
  );
}

function People(props) {
  return (
    <div id="people">
      <h2>Peoples</h2>
      <ul>
        <li>Ed</li>
        <li>Bex</li>
        <li>Anne</li>
        <li>David</li>
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

    this.user_ed = {
      id: 239479,
      name: "Ed",
      avatarId: "43YN9AVT8YN84TY8YTBITBVILE",
    };

    this.user_slack = {
      id: 487,
      name: "SlackClone",
      avatarId: "0T9Y34N0TAY298C98389ACN89Y",
    };

    this.state = {
      messages: [
        this.createMessage(this.user_slack, "home", "Hello from slack clone!"),
        this.createMessage(this.user_ed, "react", "Learning react!"),
      ],
    };
  }

  createMessage = (user, channel, text) => {
    return {
      id: Math.floor(Math.random() * 1000000),
      date: new Date(),
      user,
      channel,
      text,
    };
  }

  sendMessage = (msg) => {
    const message = this.createMessage(this.user_ed, "react", msg);
    const messages = this.state.messages.concat(message);
    this.setState({ messages });
  }

  render() {
    return (
      <div id="slack">
        <div id="sidebar">
          <h1>Slack Clone</h1>
          <Channels/>
          <People/>
        </div>
        <div id="content">
          <MessageDisplay messages={this.state.messages}/>
          <MessageEntry onSubmit={this.sendMessage}/>
        </div>
      </div>
    );
  }
}