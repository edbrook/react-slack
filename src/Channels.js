import React from 'react';

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

export default Channels;