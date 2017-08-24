import React, { Component } from 'react';

class Container extends Component {
  
  constructor(props) {
    super(props);
    const isOpen = props.hasOwnProperty('isOpen')?props.isOpen:true;
    this.state = {
      isOpen: isOpen,
      btnText: this._getText(isOpen),
    };
    this.handleClick = this.handleClick.bind(this);
  }

  static get OPEN_TEXT() { return "open"; }
  static get CLOSE_TEXT() { return "close"; }

  _getText(isOpen) {
    return isOpen ? Container.CLOSE_TEXT : Container.OPEN_TEXT;
  }
 
  handleClick(evt) {
    const isOpen = !this.state.isOpen;
    const btnText = this._getText(isOpen);
    this.setState({
      isOpen: isOpen,
      btnText: btnText,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="container_toggle">
          <button onClick={this.handleClick}>
            {this.state.btnText}
          </button> ::&nbsp;
          <strong>{this.props.description}</strong>
        </div>
        <div className="container_content" style={{display: this.state.isOpen?"block":"none"}}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Container;