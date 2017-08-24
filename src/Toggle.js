import React, { Component } from 'react';

class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOn: props.initialState?props.initialState:false
    };
  }

  toggleOnOff() {
    const nextState = !this.state.isOn;
    this.setState({isOn: nextState});
    if (this.props.hasOwnProperty('onClick')) {
      this.props.onClick(nextState);
    }
  }

  render() {
    const onText = this.props.onText;
    const offText = this.props.offText;
    const text = this.state.isOn ? onText?onText:"On" : offText?offText:"Off";
    return (
      <button className="btn" onClick={() => this.toggleOnOff()}>{text}</button>
    );
  }
}

export default Toggle;