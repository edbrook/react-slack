import React, { Component } from 'react';

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

export default MessageEntry;