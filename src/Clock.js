import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      isRunning: this.props.running ? this.props.running : false,
    };
  }

  componentDidMount() {
    if (this.state.isRunning) {
      this.startClock();
    }
  }

  componentWillUnmount() {
    this.stopClock();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hasOwnProperty('running') && nextProps.running !== this.state.isRunning) {
      this.setState({
        isRunning: nextProps.running,
      });
      if (nextProps.running) {
        this.startClock();
      } else {
        this.stopClock();
      }
    }
  }

  startClock() {
    if (!this.timerId) {
      this.timerId = setInterval(
        () => this.tick(),
        1000);
    }
  }

  stopClock() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        <h2>The time is: {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

export default Clock;