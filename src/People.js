import React from 'react';

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

export default People;