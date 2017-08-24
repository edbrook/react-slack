import React, {Component} from 'react';

class BasicForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
    this.unCtrlName = null;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(evt) {
    console.log("Form submitted ======================"
      + "\n\tControlled: " + this.state.value
      + "\n\tUncontrolled: " + this.unCtrlName.value);
    this.setState({
      value: "",
    });
    this.unCtrlName.value = "";
    this.ctrlName.focus();
    evt.preventDefault();
  }

  handleChange(evt) {
    this.setState({
      value: evt.target.value.toUpperCase(),
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <span>Name (controlled):</span>
          <input type="text"
            ref={(i) => this.ctrlName = i} // For focusing. Not for getting value!
            value={this.state.value}  // This is what makes it a controlled input
            onChange={this.handleChange}/>
        </label>
        <label>
          <span>Name (uncontrolled):</span>
          <input type="text"
            ref={(i) => this.unCtrlName = i}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
    );
  }
}

export default BasicForm;