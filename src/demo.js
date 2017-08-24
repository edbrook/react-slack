import React, {Component} from 'react';
import Clock from './Clock';
import Toggle from './Toggle';

export function MultiComponent(props) {
  const items = [1,1,2,3,5,8,13];
  const listItems = items.map((item,idx) => <li key={idx}>{item}</li>);
  return (
    <ul>{listItems}</ul>
  );
}

export class ListTest extends Component {
  constructor(props) {
    super(props);
    this.data = [
      {id:45, key:"TV", value:"panasonic"},
      {id:16, key:"lApToP", value:"MacBook"},
      {id:93, key:"CAR", value:"BMW"},
    ];
  }
  render() {
    const items = this.data.map((ob,idx)=>{
      const name = ob.key[0].toUpperCase() + ob.key.slice(1).toLowerCase();
      return (
        <li key={ob.id}>
          <strong>{name}:</strong> {ob.value}
        </li>
      );
    });
    return (<ol>{items}</ol>);
  }
}

export class ToggleTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      on: "On",
    };
  }

  render() {
    return (
      <div>
        <div>
          <span>With defaulted props:</span>
          <Toggle onText="It is ON" offText="It is OFF" initialState={true}/>
          <Toggle />
        </div>

        <div>
          <span>Change button text:</span>
          <Toggle onClick={(s) => this.setState({on: s?Math.random():"On"})}/>
          <Toggle onText={this.state.on}/>
        </div>
      </div>
    );
  }
}

export class MultiClock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clockRunning: true,
    };
  }
  render() {
    return (
      <div className="clocks">
        <Clock running={this.state.clockRunning}/>
        <Clock running={!this.state.clockRunning}/>
        <Toggle
          onText="Top Clock Running"
          offText="Bottom Clock Running"
          initialState={this.state.clockRunning}
          onClick={(newState) => this.setState({clockRunning: newState})}/>
      </div>
    );
  }
}