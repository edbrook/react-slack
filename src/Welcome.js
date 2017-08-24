import React from 'react';

function FormatName(props) {
  return (
    <span>
      <em>{props.name.lastName}</em>, {props.name.firstName}
    </span>
  );
}

function Welcome(props) {
  return (
    <div>Hello <FormatName name={props}/></div>
  );
}

export default Welcome;